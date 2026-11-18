const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const config = JSON.parse($('#miradocs-data').textContent);
const { ui } = config;
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key,value) { try { localStorage.setItem(key,value); } catch {} } };

const theme = $('.theme-select');
theme.value = ['light','dark','system'].includes(storage.get('miradocs-theme')) ? storage.get('miradocs-theme') : 'system';
theme.addEventListener('change', () => { document.documentElement.dataset.theme = theme.value; storage.set('miradocs-theme',theme.value); });
$('.language-select')?.addEventListener('change', event => location.assign(event.target.value));

const menu = $('.menu-toggle'), sidebar = $('.sidebar');
function closeMenu() { sidebar?.classList.remove('open'); menu.setAttribute('aria-expanded','false'); $('#main').inert = false; document.body.classList.remove('menu-open'); }
menu?.addEventListener('click', () => {
  if (!sidebar) return;
  const open = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); $('#main').inert = open; document.body.classList.toggle('menu-open',open);
  if(open) $('a,summary',sidebar)?.focus();
});
document.addEventListener('keydown', event => { if(event.key === 'Escape' && sidebar?.classList.contains('open')) { closeMenu(); menu.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

$$('.copy-code').forEach(button => button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(button.closest('.code-block').querySelector('pre code').textContent); button.textContent = ui.copied; }
  catch { button.textContent = ui.copyError; }
  setTimeout(() => button.textContent = ui.copy,1800);
}));
$$('.tabs').forEach(tabs => {
  const list = [...tabs.children].find(e => e.classList.contains('tab-list'));
  const buttons = $$(':scope > button',list), panels = [...tabs.children].filter(e => e.classList.contains('tab-panel'));
  const activate = index => {
    buttons.forEach((button,i) => { button.setAttribute('aria-selected',String(i===index)); button.tabIndex = i===index ? 0 : -1; });
    panels.forEach((panel,i) => panel.hidden = i!==index);
  };
  buttons.forEach((button,i) => {
    button.addEventListener('click', () => activate(i));
    button.addEventListener('keydown', event => {
      let index;
      if(event.key === 'ArrowRight') index = (i+1)%buttons.length;
      if(event.key === 'ArrowLeft') index = (i-1+buttons.length)%buttons.length;
      if(event.key === 'Home') index = 0;
      if(event.key === 'End') index = buttons.length-1;
      if(index !== undefined) { event.preventDefault(); activate(index); buttons[index].focus(); }
    });
  });
  activate(0);
});

const outlineLinks = $$('.toc a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for(const entry of entries) if(entry.isIntersecting) { outlineLinks.forEach(link => { const current = link.hash === '#'+entry.target.id; link.classList.toggle('active',current); if(current) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); }
  }, { rootMargin: '-80px 0px -65% 0px' });
  $$('.article h2, .article h3').forEach(heading => observer.observe(heading));
}

const trigger = $('.search-trigger'), dialog = $('.search-dialog');
if (trigger && dialog) {
  const input = $('input',dialog), results = $('.search-results',dialog), status = $('.search-status',dialog);
  let documents = [], fuse, selected = 0, opener, loading;
  $('kbd',trigger).textContent = /Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform) ? '⌘ K' : 'Ctrl K';
  input.setAttribute('role','combobox'); input.setAttribute('aria-expanded','false'); input.setAttribute('aria-autocomplete','list'); results.setAttribute('role','listbox');
  const message = text => { results.replaceChildren(); const div = document.createElement('div'); div.className = 'search-empty'; div.textContent = text; results.append(div); status.textContent = text; input.removeAttribute('aria-activedescendant'); };
  function select(index) {
    const links = $$('.search-result',results); if(!links.length) return;
    selected = (index+links.length)%links.length;
    links.forEach((link,i) => { link.classList.toggle('selected',i===selected); link.setAttribute('aria-selected',String(i===selected)); });
    input.setAttribute('aria-activedescendant',links[selected].id); links[selected].scrollIntoView({block:'nearest'});
  }
  function render() {
    if(!fuse) return;
    const query = input.value.trim();
    const found = query ? fuse.search(query,{limit:config.search.limit || 10}).map(result=>result.item) : documents.slice(0,6);
    if(!found.length) { message(ui.searchEmpty); return; }
    results.replaceChildren();
    found.forEach((page,index) => {
      const link = document.createElement('a'); link.className = 'search-result'; link.href = page.url; link.id = 'search-result-'+index; link.setAttribute('role','option');
      const title = document.createElement('strong'); title.textContent = page.title;
      const text = document.createElement('small'); text.textContent = page.description || page.text.slice(0,140);
      link.append(title,text); results.append(link);
      link.addEventListener('pointermove',()=>select(index));
    });
    status.textContent = String(found.length); select(Math.min(selected,found.length-1));
  }
  async function load() {
    if(fuse) return;
    if(loading) return loading;
    loading = (async()=> {
      message(ui.searchLoading);
      const [module,response] = await Promise.all([import('./fuse.js'),fetch(config.searchUrl)]);
      if(!response.ok) throw Error('Search index unavailable'); documents = await response.json();
      fuse = new module.default(documents,{keys:[{name:'title',weight:0.55},{name:'description',weight:0.3},{name:'text',weight:0.15}],threshold:config.search.threshold ?? 0.35,ignoreLocation:true,minMatchCharLength:2});
    })();
    try { await loading; } finally { loading = null; }
  }
  async function open() {
    if(dialog.open) return;
    opener = document.activeElement; dialog.showModal(); input.setAttribute('aria-expanded','true'); input.focus();
    try { await load(); render(); } catch { message(ui.searchError); }
  }
  trigger.addEventListener('click',open);
  $('.search-close',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{input.setAttribute('aria-expanded','false');opener?.focus();});
  dialog.addEventListener('click',event=>{if(event.target===dialog) dialog.close();});
  document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(dialog.open)dialog.close();else open();}});
  input.addEventListener('input',()=>{selected=0;render();});
  input.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();select(selected+(event.key==='ArrowDown'?1:-1));}
    if(event.key==='Enter'){const link=$$('.search-result',results)[selected];if(link)location.assign(link.href);}
  });
}
