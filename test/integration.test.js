import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build, serve } from '../src/index.js';
import { init } from '../src/init.js';

async function fixture(t, config = {}, files = {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(),'miradocs-integration-'));
  t.after(()=>fs.rm(root,{recursive:true,force:true}));
  const configPath = path.join(root,'miradocs.config.json');
  await fs.mkdir(path.join(root,'docs'),{recursive:true});
  await fs.writeFile(configPath,JSON.stringify({title:'Test docs',...config}));
  for(const [file,text] of Object.entries(files)) {await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),text);}
  return {root,configPath,read:file=>fs.readFile(path.join(root,'site',file),'utf8')};
}

test('nested components preserve fenced examples, unique anchors and tab relationships',async t=>{
  const f=await fixture(t,{}, {'docs/index.md':'---\ntitle: Home\n---\n## Repeated\n\n:::note\n## Repeated\n:::details More\nDetails body\n:::\n:::\n\n:::tabs\n:::tab A\n```md\n:::note\nexample\n:::\n```\n:::\n:::tab B\nSecond\n:::\n:::\n\n- [x] Task\n\nText[^1]\n\n[^1]: Footnote'});
  await build(f.configPath);const html=await f.read('index.html');
  assert.match(html,/id="repeated-2"/);assert.match(html,/role="tablist"/);assert.match(html,/aria-controls="tab-1"/);assert.match(html,/role="tabpanel" id="tab-1"/);assert.match(html,/class="details"/);assert.match(html,/type="checkbox"/);assert.match(html,/footnotes/);
});

test('locale routes, dictionaries, search isolation, and landing layout',async t=>{
  const f=await fixture(t,{locales:{en:{label:'English',path:''},es:{label:'Español',path:'es'}}},{'docs/index.md':'---\ntitle: Home\nlayout: landing\nsidebar: false\n---\nHome','docs/01-guide/01-start.md':'---\ntitle: Start\n---\nEnglish only','docs/es/index.md':'---\ntitle: Inicio\n---\nEspañol'});
  await build(f.configPath);const home=await f.read('index.html'),es=await f.read('es/index.html');
  assert.doesNotMatch(home,/<aside class="sidebar"/);assert.doesNotMatch(home,/<aside class="toc"/);assert.match(es,/lang="es"/);assert.match(es,/Buscar documentación/);
  const index=JSON.parse(await f.read('search-en.json'));assert.equal(index.length,2);assert(!index.some(p=>p.title==='Inicio'));
});

test('custom sidebar, base paths, source links, public assets, metadata and drafts',async t=>{
  const f=await fixture(t,{base:'/manual/',site:'https://example.com',sidebar:[{label:'Read',collapsed:true,items:[{page:'guide/start'}]}]}, {'docs/index.md':'---\ntitle: Home\n---\n[Start](01-guide/01-start.md#install)\n\n![Image](/image.svg)','docs/01-guide/01-start.md':'---\ntitle: Start\n---\n## Install\n\nText','docs/02-draft.md':'---\ndraft: true\n---\nUnpublished','public/image.svg':'<svg xmlns="http://www.w3.org/2000/svg"/>'});
  await build(f.configPath);const html=await f.read('index.html');
  assert.match(html,/href="\/manual\/guide\/start\/#install"/);assert.match(html,/src="\/manual\/image.svg"/);assert.match(html,/rel="canonical" href="https:\/\/example.com\/manual\/"/);assert.match(await f.read('sitemap.xml'),/manual\/guide\/start/);
  assert.equal(JSON.parse(await f.read('search.json')).length,2);
  await build(f.configPath,{drafts:true});assert.equal(JSON.parse(await f.read('search.json')).length,3);
});

test('failed builds preserve last output and reject unsafe output replacement',async t=>{
  const f=await fixture(t,{}, {'docs/index.md':'---\ntitle: Good\n---\nGood content'});
  await build(f.configPath);const previous=await f.read('index.html');
  await fs.writeFile(path.join(f.root,'docs/index.md'),'[Broken](/missing/)');
  await assert.rejects(build(f.configPath),/broken link/);assert.equal(await f.read('index.html'),previous);
  const unsafe=await fixture(t,{}, {'docs/index.md':'Hello','site/keep.txt':'User file'});
  await assert.rejects(build(unsafe.configPath),/Refusing to replace/);assert.equal(await fs.readFile(path.join(unsafe.root,'site/keep.txt'),'utf8'),'User file');
});

test('invalid config, duplicate routes and unknown components fail clearly',async t=>{
  const invalid=await fixture(t,{search:{threshold:5}},{'docs/index.md':'Hello'});await assert.rejects(build(invalid.configPath),/threshold/);
  const duplicate=await fixture(t,{}, {'docs/01-page.md':'First','docs/02-page.md':'Second'});await assert.rejects(build(duplicate.configPath),/same URL/);
  const unknown=await fixture(t,{}, {'docs/index.md':':::unknown\nText\n:::'});await assert.rejects(build(unknown.configPath),/Unknown component/);
});

test('preview serves base paths, real 404s, redirects and HEAD requests',async t=>{
  const f=await fixture(t,{base:'/manual/'},{'docs/index.md':'---\ntitle: Home\n---\nHello','docs/page.md':'---\ntitle: Page\n---\nPage'});
  const preview=await serve(f.configPath,0,{watchFiles:false});t.after(()=>preview.close());
  assert.equal((await fetch(preview.url)).status,200);assert.equal((await fetch(preview.url+'missing/')).status,404);
  assert.equal((await fetch(preview.url+'page',{redirect:'manual'})).status,308);
  assert.equal((await fetch(preview.url,{method:'HEAD'})).status,200);
  assert.equal((await fetch(preview.url+'.miradocs-output')).status,404);
});

test('initializer generates a buildable site and protects existing files',async t=>{
  const root=await fs.mkdtemp(path.join(os.tmpdir(),'miradocs-init-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
  await init(root);await build(path.join(root,'miradocs.config.json'));await assert.rejects(init(root),/overwrite/);
});

test('development watcher rebuilds and notifies connected browsers',async t=>{
  const f=await fixture(t,{}, {'docs/index.md':'---\ntitle: Before\n---\nOriginal'});
  const preview=await serve(f.configPath,0);t.after(()=>preview.close());
  const controller=new AbortController();t.after(()=>controller.abort());
  const response=await fetch(preview.url+'__miradocs/events',{signal:controller.signal});
  const reader=response.body.getReader();await reader.read();
  await fs.writeFile(path.join(f.root,'docs/index.md'),'---\ntitle: After\n---\nUpdated');
  const timer=setTimeout(()=>controller.abort(),8000);
  try {
    const event=await reader.read();assert.match(new TextDecoder().decode(event.value),/reload/);
    assert.match(await (await fetch(preview.url)).text(),/Updated/);
  } finally {clearTimeout(timer);await reader.cancel();}
});
