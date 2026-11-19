const normalize = value => value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase().replace(/\s+/g, ' ').trim();

export function initializeLists(signal, ui) {
  for (const list of document.querySelectorAll('.content-list[data-list-search]')) {
    const filter = list.querySelector(':scope > .list-filter');
    const input = filter.querySelector('input');
    const clear = filter.querySelector('.list-clear');
    const content = list.querySelector(':scope > .list-content');
    const rows = [...content.firstElementChild.children].map(element => ({ element, text: normalize(element.textContent) }));
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
  }
}
