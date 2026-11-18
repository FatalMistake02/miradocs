import fs from 'node:fs/promises';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
const runtime=(await fs.readFile(new URL('../assets/client-components.js',import.meta.url),'utf8')).replace('export function initializeClientComponents','function initializeClientComponents');
function setup(t){const dom=new JSDOM('<div data-component="counter" data-component-src="/counter.js" data-component-load="eager" data-component-props="{&quot;initial&quot;:3}"><p>Fallback content</p></div>',{runScripts:'outside-only'});t.after(()=>dom.window.close());dom.window.eval(runtime+'\nwindow.startComponents=initializeClientComponents;');dom.window.console.error=()=>{};return dom.window;}
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
test('framework host replaces fallback and disposes on navigation abort',async t=>{
 const w=setup(t),controller=new w.AbortController(),host=w.document.querySelector('[data-component]');let disposed=0;
 w.startComponents(controller.signal,{componentError:'Unavailable'},async()=>({mount(element,props){assert.equal(element.innerHTML,'');element.textContent='Count: '+props.initial;return()=>{disposed++;element.replaceChildren();};}}));
 await tick();assert.equal(host.textContent,'Count: 3');assert.equal(host.dataset.componentStatus,'ready');controller.abort();assert.equal(disposed,1);assert.equal(host.textContent,'');
});
test('module failures preserve fallback and show an error state',async t=>{
 const w=setup(t),controller=new w.AbortController(),host=w.document.querySelector('[data-component]');
 w.startComponents(controller.signal,{componentError:'Unavailable'},async()=>{throw Error('Offline');});
 await tick();assert.match(host.textContent,/Fallback content/);assert.match(host.textContent,/Unavailable/);assert.equal(host.dataset.componentStatus,'error');controller.abort();
});
test('an import finishing after navigation cannot mount a detached component',async t=>{
 const w=setup(t),controller=new w.AbortController();let resolveModule,mounted=0;
 w.startComponents(controller.signal,{componentError:'Unavailable'},()=>new Promise(resolve=>resolveModule=resolve));controller.abort();resolveModule({mount(){mounted++;}});await tick();assert.equal(mounted,0);
});
