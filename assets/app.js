import { enableNavigation } from './navigation.js';
import { initializeClientComponents } from './client-components.js';

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key,value) { try { localStorage.setItem(key,value); } catch {} } };
const searchCache = new Map();
let cleanup = () => {};

function initializePage() {
  cleanup();
  const controller = new AbortController(), cleanups = [];
  const { signal } = controller;
  cleanup = () => { controller.abort(); cleanups.forEach(dispose => dispose()); };
  const on = (target, event, listener) => target?.addEventListener(event, listener, { signal });
  const config = JSON.parse($('#miradocs-data').textContent), { ui } = config;
  on(document,'miradocs:before-navigate',cleanup);
  initializeClientComponents(signal,ui);
  const visit = url => {
    if (config.clientNavigation !== false) document.dispatchEvent(new CustomEvent('miradocs:visit', { detail: { url } }));
    else location.assign(url);
  };

  const theme = $('.theme-toggle'), systemTheme = matchMedia('(prefers-color-scheme: dark)');
  function renderTheme() {
    const preference = document.documentElement.dataset.theme;
    const mode = ['light','dark'].includes(preference) ? preference : systemTheme.matches ? 'dark' : 'light';
    theme.dataset.selected = mode;
    const name = ui.themeSwitch.replace('{current}',ui[mode]).replace('{next}',ui[mode === 'dark' ? 'light' : 'dark']);
    theme.setAttribute('aria-label',name); theme.title = name;
  }
  on(theme,'click', () => {
    const mode = theme.dataset.selected === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = mode; storage.set('miradocs-theme',mode); renderTheme();
  });
  on(systemTheme,'change',renderTheme);
  on(window,'storage',event=>{if(event.key === 'miradocs-theme'){document.documentElement.dataset.theme=event.newValue || 'system';renderTheme();}});
  renderTheme();
  on($('.language-select'),'change',event=>visit(event.target.value));

  const menu = $('.menu-toggle'), sidebar = $('.sidebar');
  function closeMenu() { sidebar?.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); $('#main').inert = false; document.body.classList.remove('menu-open'); }
  on(menu,'click', () => {
    if (!sidebar) return;
    const open = !sidebar.classList.contains('open');
    sidebar.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); $('#main').inert = open; document.body.classList.toggle('menu-open',open);
    if(open) $('a,summary',sidebar)?.focus();
  });
  on(document,'keydown',event=>{if(event.key === 'Escape' && sidebar?.classList.contains('open')){closeMenu();menu.focus();}});
  on(matchMedia('(min-width: 761px)'),'change',closeMenu);

  $$('.copy-code').forEach(button => on(button,'click', async () => {
    try { await navigator.clipboard.writeText(button.closest('.code-block').querySelector('pre code').textContent); button.textContent = ui.copied; }
    catch { button.textContent = ui.copyError; }
    button.setAttribute('aria-label',button.textContent);
    const timer = setTimeout(() => { if (!signal.aborted) { button.textContent = ui.copy;button.setAttribute('aria-label',ui.copy); } },1800);
    cleanups.push(()=>clearTimeout(timer));
  }));
  $$('.tabs').forEach(tabs => {
    const list = [...tabs.children].find(e => e.classList.contains('tab-list'));
    const buttons = $$(':scope > button',list), panels = [...tabs.children].filter(e => e.classList.contains('tab-panel'));
    const activate = index => {
      buttons.forEach((button,i) => {button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
      panels.forEach((panel,i)=>panel.hidden=i!==index);
    };
    buttons.forEach((button,i) => {
      on(button,'click',()=>activate(i));
      on(button,'keydown',event=>{
        let index;
        if(event.key==='ArrowRight')index=(i+1)%buttons.length;
        if(event.key==='ArrowLeft')index=(i-1+buttons.length)%buttons.length;
        if(event.key==='Home')index=0;
        if(event.key==='End')index=buttons.length-1;
        if(index!==undefined){event.preventDefault();activate(index);buttons[index].focus();}
      });
    });
    activate(0);
  });

  const outlineLinks = $$('.toc a');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting)outlineLinks.forEach(link=>{const current=link.hash==='#'+entry.target.id;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    },{rootMargin:'-80px 0px -65% 0px'});
    $$('.article h2,.article h3,.article h4,.article h5,.article h6').forEach(heading=>observer.observe(heading));
    cleanups.push(()=>observer.disconnect());
  }

  const trigger=$('.search-trigger'),dialog=$('.search-dialog');
  if(trigger && dialog) {
    const input=$('input',dialog),results=$('.search-results',dialog),status=$('.search-status',dialog),clear=$('.search-clear',dialog),resultsLabel=$('.search-results-label',dialog);
    const cached=searchCache.get(config.searchUrl);
    let documents=cached?.documents || [],fuse=cached?.fuse,selected=0,opener,loading;
    $('kbd',trigger).textContent=/Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform)?'⌘ K':'Ctrl K';
    input.setAttribute('role','combobox');input.setAttribute('aria-expanded','false');input.setAttribute('aria-autocomplete','list');results.setAttribute('role','listbox');
    const message=text=>{results.replaceChildren();const div=document.createElement('div');div.className='search-empty';div.textContent=text;results.append(div);status.textContent=text;input.removeAttribute('aria-activedescendant');};
    function select(index,scroll=true) {
      const links=$$('.search-result',results);if(!links.length)return;
      selected=(index+links.length)%links.length;
      links.forEach((link,i)=>{link.classList.toggle('selected',i===selected);link.setAttribute('aria-selected',String(i===selected));});
      input.setAttribute('aria-activedescendant',links[selected].id);if(scroll)links[selected].scrollIntoView({block:'nearest'});
    }
    on(results,'pointermove',event=>{const link=event.target.closest('.search-result');if(link)select(Number(link.dataset.index),false);});
    function render() {
      if(!fuse)return;
      const query=input.value.trim();clear.hidden=!input.value;resultsLabel.textContent=query?ui.searchResultsLabel:ui.searchSuggested;
      const found=query?fuse.search(query,{limit:config.search.limit || 10}).map(result=>result.item):documents.slice(0,6);
      if(!found.length){message(ui.searchEmpty);return;}
      results.replaceChildren();
      found.forEach((page,index)=>{
        const link=document.createElement('a');link.className='search-result';link.href=page.url;link.id='search-result-'+index;link.dataset.index=String(index);link.setAttribute('role','option');
        const title=document.createElement('strong'),match=query && page.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
        if(query && match>=0){const mark=document.createElement('mark');mark.textContent=page.title.slice(match,match+query.length);title.append(page.title.slice(0,match),mark,page.title.slice(match+query.length));}else title.textContent=page.title;
        const text=document.createElement('small');text.textContent=page.description || page.text.slice(0,140);
        const body=document.createElement('span');body.className='search-result-body';
        const context=document.createElement('span');context.className='search-result-context';context.textContent=page.section || '';body.append(context,title,text);
        const returnIcon=document.createElement('span');returnIcon.className='search-result-return';returnIcon.append($('#search-return-icon',dialog).content.cloneNode(true));
        link.append($('#search-document-icon',dialog).content.cloneNode(true),body,returnIcon);results.append(link);
      });
      status.textContent=ui.searchResults.replace('{count}',String(found.length));select(Math.min(selected,found.length-1));
    }
    async function load() {
      if(fuse)return;if(loading)return loading;
      loading=(async()=>{
        message(ui.searchLoading);
        const [module,response]=await Promise.all([import('./fuse.js'),fetch(config.searchUrl,{signal})]);
        if(!response.ok)throw Error('Search index unavailable');documents=await response.json();
        fuse=new module.default(documents,{keys:[{name:'title',weight:.55},{name:'description',weight:.3},{name:'text',weight:.15}],threshold:config.search.threshold ?? .35,ignoreLocation:true,minMatchCharLength:2});
        searchCache.set(config.searchUrl,{documents,fuse});
      })();
      try{await loading;}finally{loading=null;}
    }
    async function open() {
      if(dialog.open)return;
      opener=document.activeElement;dialog.showModal();input.setAttribute('aria-expanded','true');input.focus();
      try{await load();if(!signal.aborted)render();}catch{if(!signal.aborted)message(ui.searchError);}
    }
    on(trigger,'click',open);
    on($('.search-close',dialog),'click',()=>dialog.close());
    on(clear,'click',()=>{input.value='';selected=0;render();input.focus();});
    on(dialog,'close',()=>{input.setAttribute('aria-expanded','false');opener?.focus();});
    on(dialog,'click',event=>{if(event.target===dialog)dialog.close();});
    on(document,'keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(dialog.open)dialog.close();else open();}});
    on(input,'input',()=>{selected=0;render();});
    on(input,'keydown',event=>{
      if(event.key==='Escape'){event.preventDefault();dialog.close();return;}
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();select(selected+(event.key==='ArrowDown'?1:-1));}
      if(event.key==='Enter'){const link=$$('.search-result',results)[selected];if(link)visit(link.href);}
    });
  }
}

initializePage();
if(JSON.parse($('#miradocs-data').textContent).clientNavigation !== false)enableNavigation(initializePage);
