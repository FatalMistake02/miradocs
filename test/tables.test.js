import fs from 'node:fs/promises';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {createMarkdown} from '../src/markdown.js';
import {english} from '../src/i18n.js';
const render=createMarkdown({},{base:'/manual/'}),env={ui:english,icons:{}};
const source=':::table { title: Packages, search: true, align: [start, end], columnDividers: false, striped: true } {.packages}\n| Package | Version |\n| :--- | ---: |\n| [Café](/cafe/) | **2.0** |\n| Vue | `3.5` |\n| React | 19 |\n:::';
test('tables preserve native headers, Markdown, destinations and column options',()=>{
 const dom=new JSDOM(render(source,env).content),table=dom.window.document.querySelector('table');
 assert.equal(table.getAttribute('aria-label'),'Packages');assert.equal(table.querySelectorAll('th[scope=col]').length,2);
 assert.equal(table.querySelector('a').getAttribute('href'),'/manual/cafe/');assert.equal(table.querySelector('strong').textContent,'2.0');
 assert.equal(table.querySelectorAll('tr')[1].lastElementChild.style.getPropertyValue('--table-cell-align'),'end');
 assert(dom.window.document.querySelector('.packages[data-table-columns=false][data-table-striped]'));
 assert.equal(dom.window.document.querySelector('.list-filter').hidden,true);assert.equal(table.querySelectorAll('tbody tr[hidden]').length,0);
 dom.window.close();
 const aligned=render(':::table\n| A | B |\n| --- | ---: |\n| x | y |\n:::',env).content;assert.match(aligned,/--table-cell-align:right/);
});
test('table search filters body rows, retains headers and clears independently',async t=>{
 const dom=new JSDOM(render(source+'\n:::table Plain\n| One |\n| --- |\n| Other |\n:::',env).content,{runScripts:'outside-only'});t.after(()=>dom.window.close());
 const w=dom.window,controller=new w.AbortController();t.after(()=>controller.abort());
 w.eval((await fs.readFile(new URL('../assets/lists.js',import.meta.url),'utf8')).replace('export function initializeLists','function initializeLists')+'\nwindow.start=initializeLists;');w.start(controller.signal,english);
 const root=w.document.querySelector('.packages'),input=root.querySelector('input'),visible=()=>root.querySelectorAll('tbody tr:not([hidden])').length;
 input.value='CAFE';input.dispatchEvent(new w.Event('input'));assert.equal(visible(),1);assert.equal(root.querySelector('thead tr').hidden,false);
 assert.equal(w.document.querySelectorAll('.content-table')[1].querySelector('tbody tr').hidden,false);
 input.value='missing';input.dispatchEvent(new w.Event('input'));assert.equal(visible(),0);assert.equal(root.querySelector('.list-empty').hidden,false);
 root.querySelector('.list-clear').click();assert.equal(visible(),3);assert.equal(w.document.activeElement,input);
 input.value='Vue';input.dispatchEvent(new w.Event('input'));input.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(visible(),3);
 controller.abort();input.value='missing';input.dispatchEvent(new w.Event('input'));assert.equal(visible(),3);
});
test('table validation catches invalid bodies, option types and excess alignment values',()=>{
 for(const body of ['','Paragraph','| A |\n| --- |\n| B |\n\nExtra'])assert.throws(()=>render(':::table\n'+body+'\n:::',env),/one Markdown table/);
 for(const options of ['{ search: yes }','{ align: middle }','{ align: [] }','{ align: [start, end] }','{ striped: 2 }','{ columns: 2 }'])assert.throws(()=>render(':::table '+options+'\n| A |\n| --- |\n| B |\n:::',env),/table:/);
 assert.match(render(':::table { title: "<script>" }\n| A |\n| --- |\n| B |\n:::',env).content,/&lt;script&gt;/);
});
