import { clean, label, escape, safeUrl, localUrl } from './utils.js';

export function autoNavigation(pages) {
  const root = [];
  for (const page of pages.filter(p => p.sidebar !== false)) {
    const parts = page.relative.split('/'); parts.pop(); let items = root;
    for (const part of parts) {
      let group = items.find(item => item.key === part);
      if (!group) { group = { key: part, label: label(part), items: [] }; items.push(group); }
      items = group.items;
    }
    items.push({ label: page.title, url: page.url, order: page.order });
  }
  return root;
}
export function resolveNavigation(items, pages, base) {
  return items.map(item => {
    if (item.items) return { ...item, items: resolveNavigation(item.items, pages, base) };
    if (item.page) {
      const page = pages.find(p => p.relative === item.page || p.key === item.page.replace(/^\//, '').replace(/\/$/, ''));
      if (!page) throw Error(`Sidebar page not found: ${item.page}`);
      return { ...item, label: item.label || page.title, url: page.url };
    }
    if (!item.link || !item.label) throw Error('Sidebar items need page, link, or items.');
    return { ...item, url: localUrl(base, safeUrl(item.link)) };
  });
}
export function navigationPages(items, pages) {
  const byUrl = new Map(pages.filter(page => page.sidebar !== false).map(page => [page.url, page]));
  const ordered = [];
  function visit(items) {
    for (const item of items) {
      if (item.items) visit(item.items);
      else if (byUrl.has(item.url)) {
        ordered.push(byUrl.get(item.url));
        byUrl.delete(item.url);
      }
    }
  }
  visit(items);
  return ordered;
}
export function navigationHtml(items, current, chevron, level = 0) {
  return items.map(item => {
    if (item.items) {
      const active = JSON.stringify(item.items).includes(`"url":"${current}"`);
      return `<details class="nav-group" ${active || item.collapsed !== true ? 'open' : ''}><summary>${escape(item.label)}${chevron}</summary><div class="nav-children">${navigationHtml(item.items, current, chevron, level + 1)}</div></details>`;
    }
    return `<a class="nav-link ${item.url === current ? 'active' : ''}" href="${escape(item.url)}" ${item.url === current ? 'aria-current="page"' : ''}>${escape(item.label)}</a>`;
  }).join('');
}
