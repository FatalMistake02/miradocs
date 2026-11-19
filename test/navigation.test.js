import fs from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const router = (await fs.readFile(new URL('../assets/navigation.js',import.meta.url),'utf8')).replace('export function enableNavigation','function enableNavigation');
const html = (title,links='') => `<!doctype html><html lang="en"><head><title>${title}</title><meta name="description" content="${title}"></head><body data-base="/"><header class="topbar">Docs</header><div class="layout"><aside><div class="sidebar-inner"><a href="/next/">Next</a></div></aside><main tabindex="-1"><h1>${title}</h1>${links}</main></div><script id="miradocs-data" type="application/json">{}</script></body></html>`;
async function setup(t) {
  const dom=new JSDOM(html('Start','<a id="next" href="/next/">Next</a><a id="slow" href="/slow/">Slow</a>'),{url:'https://docs.test/start/',runScripts:'outside-only',pretendToBeVisual:true});
  t.after(()=>dom.window.close());
  const w=dom.window,requests=[];let initialized=0;
  w.matchMedia=()=>({matches:true});w.scrollTo=()=>{};
  w.fetch=async url=>{
    const target=new URL(url);requests.push(target.pathname);
    if(target.pathname==='/slow/')await new Promise(resolve=>setTimeout(resolve,40));
    const title=target.pathname==='/next/'?'Next':target.pathname==='/slow/'?'Slow':'Start';
    return {ok:true,url:target.href,headers:{get:()=> 'text/html'},text:async()=>html(title,'<a id="next" href="/next/">Next</a>')};
  };
  w.eval(router+'\nwindow.startNavigation = enableNavigation;');w.startNavigation(()=>initialized++);
  return {w,requests,count:()=>initialized};
}
function nextNavigation(w,action) {
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(Error('Navigation did not finish')),2000);
    w.document.addEventListener('miradocs:navigate',event=>{clearTimeout(timer);resolve(event);},{once:true});action();
  });
}
function click(w,selector,options={}) {w.document.querySelector(selector).dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0,...options}));}

test('client navigation keeps the document, updates URL and metadata, and reinitializes controls',async t=>{
  const {w,count}=await setup(t),document=w.document,root=document.documentElement;
  await nextNavigation(w,()=>click(w,'#next'));
  assert.equal(w.document,document);assert.equal(w.document.documentElement,root);
  assert.equal(w.location.pathname,'/next/');assert.equal(document.title,'Next');assert.equal(document.querySelector('h1').textContent,'Next');assert.equal(count(),1);
  assert.equal(document.querySelector('meta[name=description]').content,'Next');
});

test('back and forward restore routes and reuse cached HTML',async t=>{
  const {w,requests}=await setup(t),root=w.document.documentElement;
  await nextNavigation(w,()=>click(w,'#next'));
  await nextNavigation(w,()=>w.history.back());assert.equal(w.location.pathname,'/start/');assert.equal(w.document.title,'Start');
  await nextNavigation(w,()=>w.history.forward());assert.equal(w.location.pathname,'/next/');assert.equal(w.document.documentElement,root);
  assert.deepEqual(requests,['/next/','/start/']);
});

test('a later navigation wins when requests overlap',async t=>{
  const {w}=await setup(t);
  await nextNavigation(w,()=>{click(w,'#slow');click(w,'#next');});
  await new Promise(resolve=>setTimeout(resolve,60));
  assert.equal(w.location.pathname,'/next/');assert.equal(w.document.title,'Next');
});

test('a link to the current page clears its old fragment without fetching',async t=>{
  const {w,requests}=await setup(t);
  w.history.replaceState({},'','/start/#section');
  const link=w.document.createElement('a');link.href='/start/';link.id='top';w.document.querySelector('main').append(link);
  click(w,'#top');
  assert.equal(w.location.hash,'');assert.equal(requests.length,0);
});

test('language changes update the skip link, language and reading direction without reloading',async t=>{
  const {w}=await setup(t),original=w.document;
  const skip=w.document.createElement('a');skip.className='skip-link';skip.href='#main';skip.textContent='Skip to content';w.document.body.prepend(skip);
  w.fetch=async url=>({ok:true,url:String(url),headers:{get:()=> 'text/html'},text:async()=>html('日本語').replace('lang="en"','lang="ja" dir="ltr"').replace('<body data-base="/">','<body data-base="/"><a class="skip-link" href="#main">本文へ移動</a>')});
  await nextNavigation(w,()=>w.document.dispatchEvent(new w.CustomEvent('miradocs:visit',{detail:{url:'/ja/'}})));
  assert.equal(w.document,original);
  assert.equal(w.document.documentElement.lang,'ja');
  assert.equal(w.document.documentElement.dir,'ltr');
  assert.equal(w.document.querySelector('.skip-link').textContent,'本文へ移動');
});
