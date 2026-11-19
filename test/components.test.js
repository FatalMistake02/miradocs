import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {build} from '../src/index.js';
import {createMarkdown} from '../src/markdown.js';
import {createStarter} from '../src/starter.js';
import {english} from '../src/i18n.js';
import {icon} from '../src/icons.js';

const workspace=fileURLToPath(new URL('../',import.meta.url));
test('instance classes target one component and preserve its content and destination',()=>{
 const render=createMarkdown({custom:"<section class='custom'>{{content}}</section>"},{clientComponents:{counter:{url:'/counter.js'}}});
 const env={ui:english,icons:{note:''},usedComponents:new Set()};
 const {content}=render(':::button Start | /start/ {.hero-button .wide}\n:::\n:::button Other | /other/\n:::\n:::note Example {.one-note}\n:::custom {.custom-instance}\nNested **content**.\n:::\n:::\n:::counter {"initial":2} {.one-counter}\nFallback\n:::\n:::file-tree Files {.one-tree}\n- index.md\n:::',env);
 assert.match(content,/href="\/start\/" class="action-button hero-button wide"/);
 assert.match(content,/href="\/other\/" class="action-button"/);
 assert.match(content,/class="callout note one-note"/);
 assert.match(content,/class='custom custom-instance'/);
 assert.match(content,/<strong>content<\/strong>/);
 assert.match(content,/class="client-component one-counter"/);
 assert.match(content,/data-component-props="\{&quot;initial&quot;:2\}"/);
 assert.match(content,/class="file-tree one-tree"/);
 assert.doesNotMatch(content,/\{\.hero-button/);
});
test('file tree renders native folder disclosures, extension icons and descriptions',async()=>{
 const icons={};for(const key of ['folder','folder-open','folder-tree','file-code','file-json','file-text','chevron-down'])icons[key]=await icon(key);
 const render=createMarkdown({});const result=render(':::file-tree {"title":"Project","collapsed":true}\n- docs/\n  - index.md — Home page\n- Counter.jsx\n- config.json\n:::',{ui:english,icons});
 assert.match(result.content,/class="file-tree-directory" >/);assert.match(result.content,/lucide-folder/);assert.match(result.content,/lucide-file-code/);assert.match(result.content,/lucide-file-json/);assert.match(result.content,/file-tree-description/);assert.match(result.content,/Home page/);
 assert.throws(()=>render(':::file-tree\nNot a list\n:::',{ui:english,icons}),/nested Markdown list/);
});

test('registered React, Vue, Svelte and module components bundle with props and page CSS',async t=>{
 const root=await fs.mkdtemp(path.join(workspace,'.miradocs-test-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
 await fs.mkdir(path.join(root,'docs'));await fs.cp(path.join(workspace,'components/frameworks'),path.join(root,'components'),{recursive:true});
 const clientComponents={react:{framework:'react',src:'./components/Counter.jsx'},vue:{framework:'vue',src:'./components/Counter.vue'},svelte:{framework:'svelte',src:'./components/Counter.svelte'},element:{framework:'module',src:'./components/CounterElement.js'}};
 await fs.writeFile(path.join(root,'miradocs.config.json'),JSON.stringify({clientComponents}));
 await fs.writeFile(path.join(root,'docs/index.md'),'---\ntitle: Components\n---\n'+Object.keys(clientComponents).map(name=>`:::${name} {"initial":3}\nFallback\n:::`).join('\n'));
 await fs.writeFile(path.join(root,'docs/plain.md'),'---\ntitle: Plain\n---\nText');
 await build(path.join(root,'miradocs.config.json'));
 const html=await fs.readFile(path.join(root,'site/index.html'),'utf8'),plain=await fs.readFile(path.join(root,'site/plain/index.html'),'utf8');
 for(const name of Object.keys(clientComponents))assert.match(html,new RegExp(`data-component="${name}"`));
 assert.match(html,/data-component-props="\{&quot;initial&quot;:3\}"/);assert.match(html,/data-miradocs-component-style/);assert.doesNotMatch(plain,/data-miradocs-component-style/);
 const files=await fs.readdir(path.join(root,'site/assets/components'));assert(files.some(file=>file.endsWith('.css')));assert(files.filter(file=>file.endsWith('.js')).length>=4);
 await fs.writeFile(path.join(root,'docs/index.md'),':::react invalid props\nFallback\n:::');await assert.rejects(build(path.join(root,'miradocs.config.json')),/JSON object/);
});

test('starter generates only project files and protects existing directories',async t=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'miradocs-starter-'));t.after(()=>fs.rm(root,{recursive:true,force:true}));
 await createStarter(root,{version:'^1.0.0',title:'My docs'});
 assert.deepEqual((await fs.readdir(root)).sort(),['.gitignore','docs','miradocs.config.json','package.json','theme']);
 const pkg=JSON.parse(await fs.readFile(path.join(root,'package.json'),'utf8'));assert.equal(pkg.devDependencies.miradocs,'^1.0.0');assert.equal(pkg.private,true);assert.equal(pkg.scripts.dev,'miradocs dev');
 await assert.rejects(createStarter(root),/overwrite/);
});
