// Static HTML remains the source of truth; this layer enhances same-site links.
export function enableNavigation(initializePage) {
  let controller, navigating = false, displayed = new URL(location.href);
  const cache = new Map();
  history.scrollRestoration = 'manual';

  function remember() {
    if (navigating) return;
    history.replaceState({ ...history.state, miradocsScroll: [scrollX, scrollY] }, '', location.href);
  }
  let scrollFrame;
  addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(() => { scrollFrame = null; remember(); });
  }, { passive: true });
  remember();

  function position(url, saved) {
    const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    if (saved) scrollTo(...saved);
    else if (target) target.scrollIntoView();
    else scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = previous;
  }

  async function navigate(url, { pop = false, saved } = {}) {
    controller?.abort(); controller = new AbortController();
    if (!pop) remember();
    const request = controller;
    navigating = true; document.documentElement.dataset.navigating = 'true';
    document.querySelector('main')?.setAttribute('aria-busy', 'true');
    try {
      let html = cache.get(url.pathname + url.search);
      let finalURL = url;
      if (!html) {
        const response = await fetch(url, { signal: request.signal, headers: { Accept: 'text/html' } });
        if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) throw Error('Navigation unavailable');
        html = await response.text();
        finalURL = new URL(response.url); finalURL.hash = url.hash;
        cache.set(finalURL.pathname + finalURL.search, html);
        if (cache.size > 20) cache.delete(cache.keys().next().value);
      }
      if (request.signal.aborted) return;
      const page = new DOMParser().parseFromString(html, 'text/html');
      if (!page.querySelector('#miradocs-data') || !page.querySelector('.layout')) throw Error('Not a documentation page');
      const sidebarScroll = document.querySelector('.sidebar-inner')?.scrollTop || 0;
      document.querySelector('dialog[open]')?.close();
      document.body.classList.remove('menu-open');
      for (const selector of ['.topbar', '.layout', '.search-dialog', '#miradocs-data']) {
        const current = document.querySelector(selector), next = page.querySelector(selector);
        if (current && next) current.replaceWith(document.importNode(next, true));
        else if (current) current.remove();
        else if (next) document.body.append(document.importNode(next, true));
      }
      document.title = page.title;
      document.documentElement.lang = page.documentElement.lang;
      document.documentElement.dir = page.documentElement.dir;
      const metadata = 'meta[name="description"], meta[property^="og:"], link[rel="canonical"], link[rel="alternate"]';
      document.head.querySelectorAll(metadata).forEach(node => node.remove());
      page.head.querySelectorAll(metadata).forEach(node => document.head.append(document.importNode(node, true)));
      if (!pop) history.pushState({ miradocsScroll: [0, 0] }, '', finalURL);
      displayed = finalURL;
      initializePage();
      const scroller = document.querySelector('.sidebar-inner');
      if (scroller) {
        scroller.scrollTop = sidebarScroll;
        const active = scroller.querySelector('[aria-current="page"]');
        if (active && scroller.clientHeight) {
          const item = active.getBoundingClientRect(), pane = scroller.getBoundingClientRect();
          if (item.bottom > pane.bottom) scroller.scrollTop += item.bottom - pane.bottom + 16;
          else if (item.top < pane.top) scroller.scrollTop -= pane.top - item.top + 16;
        }
      }
      document.querySelector('main')?.focus({ preventScroll: true });
      position(finalURL, saved);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelector('main')?.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 140, easing: 'ease-out' });
      document.dispatchEvent(new CustomEvent('miradocs:navigate', { detail: { url: finalURL.href } }));
    } catch (error) {
      if (request.signal.aborted) return;
      // Preserve normal browser navigation if the host cannot supply HTML.
      if (pop) location.reload(); else location.assign(url);
    } finally {
      if (controller === request) {
        navigating = false; delete document.documentElement.dataset.navigating;
        document.querySelector('main')?.removeAttribute('aria-busy');
      }
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || link.hasAttribute('data-no-router') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href), base = document.body.dataset.base;
    if (url.origin !== location.origin || !url.pathname.startsWith(base) || /\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith('.html')) return;
    if (url.pathname === location.pathname && url.search === location.search) {
      if (url.hash) return;
      event.preventDefault();
      if(url.href !== location.href) { remember(); history.pushState({miradocsScroll:[0,0]},'',url); displayed=url; }
      position(url); return;
    }
    event.preventDefault(); navigate(url);
  });
  addEventListener('popstate', event => {
    const url = new URL(location.href);
    if (url.pathname === displayed.pathname && url.search === displayed.search) { displayed = url; position(url, event.state?.miradocsScroll); return; }
    navigate(url, { pop: true, saved: event.state?.miradocsScroll });
  });
  document.addEventListener('miradocs:visit', event => navigate(new URL(event.detail.url, location.href)));
}
