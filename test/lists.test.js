import fs from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createMarkdown } from '../src/markdown.js';
import { english, messages } from '../src/i18n.js';

const render = createMarkdown({}, { base: '/manual/' });
const env = { ui: english, icons: { search: '<svg class="search-icon"></svg>', x: '<svg class="clear-icon"></svg>' } };
const runtime = (await fs.readFile(new URL('../assets/lists.js', import.meta.url), 'utf8')).replace('export function initializeLists', 'function initializeLists');
const example = ':::list {"title":"Resources","search":true,"empty":"Try another word."} {.resources}\n- [Café setup](/setup/)  \n  Install the project.\n  - Windows notes\n  - Linux notes\n- **Theming**  \n  Change colors and fonts.\n- Deploy\n:::';

test('lists preserve Markdown semantics, links, nesting and per-instance styles without requiring search', () => {
  const dom = new JSDOM(render(example + '\n:::list Checklist\n3. First\n4. Second\n:::', env).content);
  const doc = dom.window.document;
  const lists = doc.querySelectorAll('.content-list');
  assert.equal(lists.length, 2);
  assert(lists[0].classList.contains('resources'));
  assert.equal(lists[0].querySelector('a').getAttribute('href'), '/manual/setup/');
  assert.equal(lists[0].querySelectorAll('.list-content > ul > li').length, 3);
  assert.equal(lists[0].querySelectorAll('li li').length, 2);
  assert.equal(lists[0].querySelector('strong').textContent, 'Theming');
  assert.equal(lists[0].querySelector('.list-filter').hidden, true);
  assert.equal(lists[0].querySelector('.list-filter').parentElement.className, 'list-header');
  assert.equal(lists[0].querySelectorAll('li[hidden]').length, 0);
  assert.equal(lists[1].querySelector('.list-filter'), null);
  assert.equal(lists[1].querySelector('ol').getAttribute('start'), '3');
  dom.window.close();
});

test('list options escape content and reject invalid options or non-list bodies', () => {
  const escaped = render(':::list {"title":"<script>","search":true,"placeholder":"\\\"<input>","empty":"<img>"}\n- Item\n:::', env).content;
  assert.match(escaped, /&lt;script&gt;/);
  assert.match(escaped, /&quot;&lt;input&gt;/);
  assert.doesNotMatch(escaped, /<script>|<img>/);
  for (const options of ['{"search":"yes"}', '{"title":1}', '{"empty":false}', '{"unknown":true}', '{"columns":0}', '{"columns":7}', '{"columns":1.5}', '{"columns":"2"}', '{ columnDividers: none }', '{ align: middle }', '{ align: [] }', '{ columns: 2, align: [start, end, center] }', '{invalid}']) {
    assert.throws(() => render(`:::list ${options}\n- Item\n:::`, env), /list:/);
  }
  for (const body of ['', 'A paragraph', '- Item\n\nParagraph', '- Item\n\n1. Another list']) {
    assert.throws(() => render(`:::list\n${body}\n:::`, env), /one Markdown list/);
  }
});

test('column dividers and alignments render and follow filtering and responsive column counts', t => {
  const html = render(':::list { columns: 2, search: true, columnDividers: false, align: [start, end] }\n- Alpha\n- Beta\n- Gamma\n- Delta\n:::\n:::list { columns: 2, align: center }\n- One\n- Two\n:::', env).content;
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const w = dom.window, controller = new w.AbortController(), observers = [];
  w.ResizeObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  const [list, plain] = w.document.querySelectorAll('.content-list');
  const items = list.querySelector('ul'); items.style.gridTemplateColumns = '200px 200px';
  assert.equal(list.dataset.listColumnDividers, 'false');
  const visibleAlignments = () => [...items.children].filter(row => !row.hidden).map(row => row.dataset.listAlign);
  assert.deepEqual(visibleAlignments(), ['start', 'end', 'start', 'end']);
  w.eval(runtime + '\nwindow.initializeLists = initializeLists;');
  w.initializeLists(controller.signal, english);
  assert.equal(plain.querySelector('li').dataset.listAlign, 'center');
  const input = list.querySelector('input'); input.value = 'ta'; input.dispatchEvent(new w.Event('input'));
  assert.deepEqual(visibleAlignments(), ['start', 'end']);
  items.style.gridTemplateColumns = '300px'; observers[0].callback();
  assert.deepEqual(visibleAlignments(), ['start', 'start']);
  controller.abort(); assert(observers.every(observer => observer.disconnected));
});

test('column lists preserve source order, numbered starts and independent nested lists', () => {
  const source = ':::list {"title":"Resources","search":true,"columns":3}\n4. First\n5. Second\n   - Nested\n6. Third\n:::\n:::list Plain\n- Single column\n:::';
  const dom = new JSDOM(render(source, env).content);
  const [columns, plain] = dom.window.document.querySelectorAll('.content-list');
  assert.equal(columns.dataset.listColumns, '3');
  assert.equal(plain.dataset.listColumns, '1');
  assert.equal(columns.querySelector('ol').getAttribute('start'), '4');
  assert.deepEqual([...columns.querySelectorAll('.list-content > ol > li')].map(row => row.textContent.replace(/\s+/g, ' ').trim()), ['First', 'Second Nested', 'Third']);
  assert.equal(columns.querySelectorAll('li > ul > li').length, 1);
  assert.equal(columns.querySelector('.list-header > .list-title').textContent, 'Resources');
  assert(columns.querySelector('.list-header > .list-filter input'));
  dom.window.close();
});

test('search filters rows independently, keeps nested items, announces results and resets with Escape or clear', t => {
  const html = render(example + '\n:::list {"search":true}\n1. Independent\n2. Other\n:::', env).content;
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  const w = dom.window, controller = new w.AbortController();
  w.eval(runtime + '\nwindow.initializeLists = initializeLists;');
  w.initializeLists(controller.signal, english);
  const [first, second] = w.document.querySelectorAll('.content-list');
  const input = first.querySelector('input'), clear = first.querySelector('.list-clear');
  const visible = list => [...list.querySelector('.list-content').firstElementChild.children].filter(row => !row.hidden);
  const search = value => { input.value = value; input.dispatchEvent(new w.Event('input')); };
  assert.equal(first.querySelector('.list-filter').hidden, false);
  assert.equal(second.querySelector('.list-header').hidden, false);
  assert.equal(first.querySelector('.list-status').textContent, '');
  search('SETUP cafe');
  assert.equal(visible(first).length, 1);
  assert.match(visible(first)[0].textContent, /Linux notes/);
  assert.equal(first.querySelector('.list-status').textContent, '1 of 3 items');
  assert.equal(visible(second).length, 2);
  search('linux'); assert.equal(visible(first).length, 1);
  search('colors fonts'); assert.match(visible(first)[0].textContent, /Theming/);
  search('<script>');
  assert.equal(visible(first).length, 0);
  assert.equal(first.querySelector('.list-empty').hidden, false);
  assert.equal(first.querySelector('.list-status').textContent, 'Try another word.');
  input.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  assert.equal(input.value, ''); assert.equal(visible(first).length, 3);
  assert.equal(first.querySelector('.list-empty').hidden, true);
  search('deploy'); clear.click();
  assert.equal(visible(first).length, 3); assert.equal(clear.hidden, true);
  assert.equal(w.document.activeElement, input);
  controller.abort(); search('deploy');
  assert.equal(visible(first).length, 3);
  const nextController = new w.AbortController();
  w.initializeLists(nextController.signal, english);
  assert.equal(visible(first).length, 1);
  nextController.abort();
});

test('list messages follow locale dictionaries and allow overrides', () => {
  assert.match(messages('es', {}).listSearch, /Buscar/);
  assert.match(messages('fr', {}).listSearch, /Rechercher/);
  assert.equal(messages('en', { ui: { listEmpty: 'Nothing here.' } }).listEmpty, 'Nothing here.');
});
