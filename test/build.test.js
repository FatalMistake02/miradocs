import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { build } from '../src/index.js';
import { JSDOM } from 'jsdom';

test('builds Markdown, navigation, components and a subpath search index', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'miradocs-test-'));
  t.after(() => fs.rm(root,{recursive:true,force:true}));
  await fs.mkdir(path.join(root,'docs','01-guide'),{recursive:true});
  await fs.mkdir(path.join(root,'components'));
  await fs.writeFile(path.join(root,'miradocs.config.json'), JSON.stringify({title:'Test',base:'/manual/'}));
  await fs.writeFile(path.join(root,'components','card.html'), '<aside>{{title}} {{content}}</aside>');
  await fs.writeFile(path.join(root,'docs','index.md'), '---\ntitle: Home\n---\n## Hello\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n:::card Sample\n**Bold**\n:::');
  await fs.writeFile(path.join(root,'docs','01-guide','01-start.md'), '---\ntitle: Start\n---\nContent');
  await build(path.join(root,'miradocs.config.json'));
  const html=await fs.readFile(path.join(root,'site','index.html'),'utf8');
  assert.match(html, /<table>/);assert.match(html, /<aside>Sample/);assert.match(html, /<strong>Bold<\/strong>/);assert.match(html, /href="\/manual\/guide\/start\/"/);
  const search=JSON.parse(await fs.readFile(path.join(root,'site','search.json'),'utf8'));assert.equal(search[1].url,'/manual/guide/start/');
});

test('rejects output directories containing content', async t => {
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'miradocs-test-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  await fs.mkdir(path.join(root,'docs'));await fs.writeFile(path.join(root,'config.json'),JSON.stringify({output:'.'}));
  await assert.rejects(build(path.join(root,'config.json')),/Output must be separate/);
});

test('bottom navigation follows nested sidebar order', async t => {
  for (const custom of [false, true]) await t.test(custom ? 'configured sidebar' : 'automatic sidebar', async t => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'miradocs-pager-'));
    t.after(() => fs.rm(root, { recursive: true, force: true }));
    const files = [
      ['index.md', 'Home', 0],
      ['01-guide/01-start.md', 'Start', 0],
      ['01-guide/02-advanced/01-nested.md', 'Nested', 2],
      ['01-guide/02-advanced/02-deeper/01-detail.md', 'Detail', 3],
      ['02-finish.md', 'Finish', 1],
      ['hidden.md', 'Hidden', 0, 'sidebar: false\n'],
      ['unlisted.md', 'Unlisted', 4]
    ];
    for (const [file, title, order, extra = ''] of files) {
      const destination = path.join(root, 'docs', file);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, `---\ntitle: ${title}\norder: ${order}\n${extra}---\nContent`);
    }
    const sidebar = custom ? [
      { page: '02-finish.md' },
      { label: 'Guide', items: [
        { page: '01-guide/01-start.md' },
        { label: 'Advanced', items: [
          { page: '01-guide/02-advanced/01-nested.md' },
          { label: 'Deeper', items: [{ page: '01-guide/02-advanced/02-deeper/01-detail.md' }] }
        ] }
      ] },
      { label: 'External', link: 'https://example.com/' },
      { page: 'hidden.md' },
      { page: 'index.md' },
      { page: '02-finish.md' }
    ] : undefined;
    const configPath = path.join(root, 'config.json');
    await fs.writeFile(configPath, JSON.stringify({ base: '/manual/', sidebar }));
    const { pages, output } = await build(configPath);
    const sequence = custom ? ['Finish', 'Start', 'Nested', 'Detail', 'Home'] : ['Home', 'Start', 'Nested', 'Detail', 'Finish', 'Unlisted'];
    const byTitle = new Map(pages.map(page => [page.title, page.url]));
    for (const page of pages) {
      const html = await fs.readFile(path.join(output, page.url.slice('/manual/'.length), 'index.html'), 'utf8');
      const dom = new JSDOM(html);
      try {
        const index = sequence.indexOf(page.title);
        const pager = dom.window.document.querySelector('.pagination');
        assert.equal(pager.querySelector('[rel="prev"]')?.getAttribute('href'), index > 0 ? byTitle.get(sequence[index - 1]) : undefined, `${page.title}: previous`);
        assert.equal(pager.querySelector('[rel="next"]')?.getAttribute('href'), index >= 0 ? byTitle.get(sequence[index + 1]) : undefined, `${page.title}: next`);
      } finally { dom.window.close(); }
    }
  });
});
