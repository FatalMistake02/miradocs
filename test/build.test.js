import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { build } from '../src/index.js';

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
