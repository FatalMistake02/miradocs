export function initializeOutline(signal) {
  const links = [...document.querySelectorAll('.toc a, .mobile-toc a')];
  const headings = [...document.querySelectorAll('.article h2[id], .article h3[id], .article h4[id], .article h5[id], .article h6[id]')];
  if (!links.length || !headings.length) return;
  const idFromHash = hash => { try { return decodeURIComponent(hash.slice(1)); } catch { return ''; } };
  let selected, scrollingToAnchor = false, frame, settleTimer;
  const on = (target, event, listener, options = {}) => target.addEventListener(event, listener, {...options, signal});
  function activate(id) {
    for (const link of links) {
      const active = idFromHash(link.hash) === id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    }
  }
  function settle() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { scrollingToAnchor = false; }, 180);
  }
  function chooseAnchor(hash) {
    const id = idFromHash(hash);
    if (!headings.some(heading => heading.id === id)) return false;
    selected = id; scrollingToAnchor = true; settle(); activate(id);
    return true;
  }
  function update() {
    frame = null;
    if (selected) { activate(selected); return; }
    const threshold = (document.querySelector('.topbar')?.getBoundingClientRect().bottom || 0) + 28;
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top > threshold) break;
      current = heading;
    }
    const page = document.documentElement;
    if (page.scrollHeight > window.innerHeight && window.scrollY + window.innerHeight >= page.scrollHeight - 2) current = headings.at(-1);
    activate(current.id);
  }
  function schedule() { if (frame == null) frame = requestAnimationFrame(update); }
  function resumeTracking() { scrollingToAnchor = false; clearTimeout(settleTimer); }
  for (const link of links) on(link, 'click', event => {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) chooseAnchor(link.hash);
  });
  on(window, 'hashchange', () => { if (!chooseAnchor(location.hash)) { selected = null; resumeTracking(); schedule(); } });
  on(window, 'scroll', () => {
    if (selected && scrollingToAnchor) { settle(); return; }
    selected = null; schedule();
  }, {passive: true});
  on(window, 'wheel', resumeTracking, {passive: true});
  on(window, 'touchmove', resumeTracking, {passive: true});
  on(window, 'keydown', event => {
    if (event.target.closest('input,textarea,select,[contenteditable]')) return;
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) resumeTracking();
  });
  on(window, 'resize', schedule);
  signal.addEventListener('abort', () => { cancelAnimationFrame(frame); clearTimeout(settleTimer); }, {once: true});
  if (!chooseAnchor(location.hash)) update();
}
