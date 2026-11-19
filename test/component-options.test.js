import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { parseComponentOptions } from '../src/component-options.js';
import { createMarkdown } from '../src/markdown.js';
import { english, messages } from '../src/i18n.js';
import { localeMessages } from '../src/locale-messages.js';

test('component options accept bare keys and text, quoted punctuation, nested values and trailing commas', () => {
  const source = `{ title: Project guides, search: true, columns: 2, placeholder: 'Find: a guide', empty: "Nothing, yet", tags: [one, two], options: { initial: 3, enabled: false, value: null }, }`;
  assert.deepEqual(parseComponentOptions(source, 'example'), {
    title: 'Project guides', search: true, columns: 2, placeholder: 'Find: a guide', empty: 'Nothing, yet', tags: ['one', 'two'], options: { initial: 3, enabled: false, value: null }
  });
  assert.deepEqual(parseComponentOptions('{ date: 2026-11-18, url: https://example.com/docs#start, label: on }', 'example'), { date: '2026-11-18', url: 'https://example.com/docs#start', label: 'on' });
});

test('existing JSON keeps string types, escaped characters and nested props', () => {
  const data = { title: 'true', value: 'null', quote: 'A "quoted" title', tags: ['one', 2, false], nested: { path: 'C:\\docs\\start', note: 'one\ntwo' } };
  assert.deepEqual(parseComponentOptions(JSON.stringify(data), 'example'), data);
});

test('invalid options fail clearly and parsing never evaluates code', () => {
  for (const source of ['[]', 'null', 'true', '{ title: One, title: Two }', '{ title: [one, two }', '{ invalid }', '{search:true}', '{ value: .inf }', '{"value":1e999}', '{ value: !!js/function "function(){}" }', '{ value: &loop [*loop] }', '{ key: *missing }', '{ [one, two]: value }']) {
    assert.throws(() => parseComponentOptions(source, 'widget'), /widget:/);
  }
  assert.equal(parseComponentOptions('{ value: process.exit() }', 'example').value, 'process.exit()');
  const prototype = parseComponentOptions('{ __proto__: { polluted: true }, constructor: hello }', 'example');
  assert.equal(Object.prototype.polluted, undefined);
  assert.equal(Object.hasOwn(prototype, '__proto__'), true);
});

test('all option-bearing components use the shared syntax and retain instance classes', () => {
  const render = createMarkdown({}, { base: '/manual/', clientComponents: { counter: { url: '/counter.js' } } });
  const source = ':::list { title: Guides, search: true, columns: 2 } {.guide-list}\n- Item\n:::\n:::file-tree { title: Project files, collapsed: true, icons: { .mira: /icons/mira.svg } } {.project-tree}\n- folder/\n  - main.mira\n:::\n:::counter { initial: 2, label: Click me, tags: [one, two], options: { enabled: true } } {.demo-counter}\nFallback\n:::';
  const dom = new JSDOM(render(source, { ui: english, icons: {}, usedComponents: new Set() }).content);
  const doc = dom.window.document;
  assert.equal(doc.querySelector('.guide-list .list-title').textContent, 'Guides');
  assert.equal(doc.querySelector('.guide-list').dataset.listColumns, '2');
  assert.equal(doc.querySelector('.project-tree .file-tree-title').textContent, 'Project files');
  assert.equal(doc.querySelector('.project-tree details').open, false);
  assert.equal(doc.querySelector('.project-tree img').getAttribute('src'), '/manual/icons/mira.svg');
  assert.deepEqual(JSON.parse(doc.querySelector('.demo-counter').dataset.componentProps), { initial: 2, label: 'Click me', tags: ['one', 'two'], options: { enabled: true } });
  dom.window.close();
});

test('new interface dictionaries cover every message and resolve regional locale codes', () => {
  for (const language of ['de', 'pt', 'ja', 'zh']) {
    assert.deepEqual(Object.keys(localeMessages[language]).sort(), Object.keys(english).sort(), language);
    for (const key of Object.keys(english)) {
      assert.equal(typeof localeMessages[language][key], 'string');
      assert.deepEqual([...localeMessages[language][key].matchAll(/\{\w+\}/g)].map(match => match[0]).sort(), [...english[key].matchAll(/\{\w+\}/g)].map(match => match[0]).sort(), `${language}.${key}`);
    }
  }
  assert.equal(messages('pt-BR', {}).search, localeMessages.pt.search);
  assert.equal(messages('zh-CN', {}).search, localeMessages.zh.search);
});
