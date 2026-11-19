const normalize = value => value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase().replace(/\s+/g, ' ').trim();

export function initializeLists(signal, ui) {
  for (const list of document.querySelectorAll('.content-list')) {
    const content = list.querySelector(':scope > .list-content');
    const items = content.firstElementChild;
    const elements = items.tagName === 'TABLE' ? items.tBodies[0]?.rows || [] : items.children;
    const rows = [...elements].map(element => ({ element, text: normalize(element.textContent) }));
    const alignments = list.dataset.listAlignments && JSON.parse(list.dataset.listAlignments);
    const alignColumns = () => {
      if (!alignments) return;
      const columns = getComputedStyle(items).gridTemplateColumns.split(/\s+/).filter(track => Number.parseFloat(track) > 0).length || Number(list.dataset.listColumns);
      let index = 0;
      for (const { element } of rows) {
        if (element.hidden) continue;
        const alignment = Array.isArray(alignments) ? alignments[index++ % columns] ?? 'start' : alignments;
        if (element.dataset.listAlign !== alignment) element.dataset.listAlign = alignment;
      }
    };
    alignColumns();
    if (alignments && typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(alignColumns);
      observer.observe(items);
      signal.addEventListener('abort', () => observer.disconnect(), { once: true });
    }
    if (!list.hasAttribute('data-list-search')) continue;
    const header = list.querySelector(':scope > .list-header');
    const filter = header.querySelector(':scope > .list-filter');
    const input = filter.querySelector('input');
    const clear = filter.querySelector('.list-clear');
    const empty = list.querySelector(':scope > .list-empty');
    const status = list.querySelector(':scope > .list-status');
    const update = (announce = true) => {
      const words = normalize(input.value).split(' ').filter(Boolean);
      let visible = 0;
      for (const row of rows) {
        row.element.hidden = !words.every(word => row.text.includes(word));
        if (!row.element.hidden) visible++;
      }
      clear.hidden = !input.value;
      alignColumns();
      empty.hidden = visible !== 0;
      if (announce) status.textContent = visible ? ui.listResults.replace('{visible}', String(visible)).replace('{total}', String(rows.length)) : empty.textContent;
    };
    const reset = () => { input.value = ''; update(); input.focus(); };
    input.addEventListener('input', () => update(), { signal });
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape' && input.value) { event.preventDefault(); event.stopPropagation(); reset(); }
    }, { signal });
    clear.addEventListener('click', reset, { signal });
    update(false);
    filter.hidden = false;
    header.hidden = false;
  }
}
