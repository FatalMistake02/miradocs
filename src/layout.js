import { escape as e, localUrl } from './utils.js';
import { navigationHtml } from './navigation.js';

export function layout(ctx, page, pages, navigation, icons, ui, { dev = false, notFound = false } = {}) {
  const { config, base, locales } = ctx, locale = locales[page.locale];
  const landing = page.layout === 'landing';
  const sameLanguage = pages.filter(p => p.locale === page.locale && p.sidebar !== false);
  const index = sameLanguage.indexOf(page), previous = sameLanguage[index - 1], next = sameLanguage[index + 1];
  const home = base + (locale.path ? locale.path + '/' : '');
  const siteName = config.title || 'Documentation';
  const styles = (config.styles || []).map(file => `<link rel="stylesheet" href="${e(base + 'theme/' + file)}">`).join('');
  const links = (config.links || []).map((link, i) => `<a href="${e(localUrl(base, link.url))}" ${link.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${icons['link' + i]}<span>${e(link.label)}</span></a>`).join('');
  const languages = Object.entries(locales).length > 1 ? `<label class="select-control">${icons.languages}<span class="sr-only">${e(ui.language)}</span><select class="language-select" aria-label="${e(ui.language)}">${Object.entries(locales).map(([key, value]) => {
    const target = pages.find(p => p.locale === key && p.key === page.key) || pages.find(p => p.locale === key && p.key === '') || pages.find(p => p.locale === key);
    return `<option value="${e(target?.url || base)}" ${key === page.locale ? 'selected' : ''}>${e(value.label || key)}</option>`;
  }).join('')}</select></label>` : '';
  const pager = (item, text, arrow) => item ? `<a class="pager-link" href="${e(item.url)}"><span>${e(text)}</span><strong>${e(item.title)}${arrow}</strong></a>` : '<span></span>';
  const canonical = config.site ? new URL(page.url, config.site).href : '';
  const toc = page.headings.map(([level, text, id]) => `<a class="toc-level-${level}" href="#${e(id)}">${e(text)}</a>`).join('');
  const client = JSON.stringify({ ui, locale: page.locale, search: config.search || {}, searchUrl: base + `search-${page.locale}.json` }).replaceAll('<', '\\u003c');
  return `<!doctype html><html lang="${e(page.locale)}" dir="${locale.dir === 'rtl' ? 'rtl' : 'ltr'}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${e(page.description)}">
<title>${e(page.title)} | ${e(siteName)}</title>${canonical ? `<link rel="canonical" href="${e(canonical)}"><meta property="og:url" content="${e(canonical)}">` : ''}
${config.site ? pages.filter(p=>p.key === page.key).map(p=>`<link rel="alternate" hreflang="${e(p.locale)}" href="${e(new URL(p.url,config.site).href)}">`).join('') : ''}
<meta property="og:title" content="${e(page.title)}"><meta property="og:description" content="${e(page.description)}"><meta property="og:type" content="article">
${config.favicon ? `<link rel="icon" href="${e(localUrl(base, config.favicon))}">` : ''}
<script>try{document.documentElement.dataset.theme=localStorage.getItem('miradocs-theme')||'system'}catch(e){}</script>
<link rel="stylesheet" href="${base}assets/style.css">${styles}</head>
<body data-base="${e(base)}"><a class="skip-link" href="#main">${e(ui.skip)}</a>
<header class="topbar"><a class="brand" href="${home}">${config.logo ? `<img class="logo" src="${e(localUrl(base, config.logo))}" alt="">` : icons['book-open']}<span>${e(siteName)}</span></a>
<div class="top-actions"><nav class="header-links" aria-label="Links">${links}</nav>${languages}
${config.search !== false ? `<button class="search-trigger" type="button" aria-label="${e(ui.search)}" aria-haspopup="dialog">${icons.search}<span>${e(ui.search)}</span><kbd>Ctrl K</kbd></button>` : ''}
<label class="select-control theme-control">${icons['sun-moon']}<span class="sr-only">${e(ui.theme)}</span><select class="theme-select" aria-label="${e(ui.theme)}"><option value="system">${e(ui.system)}</option><option value="light">${e(ui.light)}</option><option value="dark">${e(ui.dark)}</option></select></label>
<button class="menu-toggle icon-button" type="button" aria-label="${e(ui.menu)}" aria-expanded="false" aria-controls="sidebar">${icons.menu}</button></div></header>
<div class="layout ${landing ? 'landing-layout' : ''}">${!landing ? `<aside class="sidebar" id="sidebar"><div class="sidebar-inner"><nav aria-label="${e(ui.documentation)}">${navigationHtml(navigation, page.url, icons['chevron-down'])}</nav></div></aside>` : ''}
<main id="main" class="main" tabindex="-1">${!landing ? `<div class="breadcrumb"><a href="${home}">${e(ui.documentation)}</a>${icons['chevron-right']}<span>${e(page.title)}</span></div>` : ''}
<h1>${e(page.title)}</h1>${page.description ? `<p class="lede">${e(page.description)}</p>` : ''}${toc ? `<details class="mobile-toc"><summary>${e(ui.outline)}</summary>${toc}</details>` : ''}
<article class="article">${page.content}</article>
${config.editUrl && !notFound ? `<a class="edit-link" href="${e(config.editUrl.replace(/\/$/, '') + '/' + page.rel.split('/').map(encodeURIComponent).join('/'))}">${icons['square-pen']}${e(ui.edit)}</a>` : ''}
${!notFound && !landing ? `<nav class="pagination" aria-label="Pagination">${pager(previous, ui.previous, icons['arrow-left'])}${pager(next, ui.next, icons['arrow-right'])}</nav>` : ''}
${config.footer ? `<footer>${e(config.footer)}</footer>` : ''}</main>
${!landing ? `<aside class="toc" aria-label="${e(ui.outline)}"><div class="toc-inner">${toc ? `<div class="toc-title">${e(ui.outline)}</div>${toc}` : ''}</div></aside>` : ''}</div>
${config.search !== false ? `<dialog class="search-dialog" aria-label="${e(ui.search)}"><div class="search-box"><div class="search-input-wrap">${icons.search}<input type="search" placeholder="${e(ui.searchPlaceholder)}" aria-label="${e(ui.search)}" autocomplete="off" aria-controls="search-results"><button class="search-close" aria-label="${e(ui.close)}" type="button"><kbd>Esc</kbd></button></div><div class="search-status sr-only" role="status" aria-live="polite"></div><div class="search-results" id="search-results"></div><div class="search-footer"><span>↑↓ ${e(ui.searchNavigate)}</span><span>↵ ${e(ui.searchSelect)}</span></div></div></dialog>` : ''}
<script type="application/json" id="miradocs-data">${client}</script><script type="module" src="${base}assets/app.js"></script>${(config.scripts || []).map(url=>`<script type="module" src="${e(localUrl(base,url))}"></script>`).join('')}${dev ? `<script src="${base}__miradocs/client.js" defer></script>` : ''}</body></html>`;
}
