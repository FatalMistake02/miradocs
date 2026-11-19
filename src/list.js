import { escape } from './utils.js';
import { parseComponentOptions } from './component-options.js';

export function renderList(tokens, index, env) {
  const title = tokens[index].meta.title;
  let options = { title };
  if (title.startsWith('{')) {
    options = parseComponentOptions(title, 'list');
  }
  for (const [key, value] of Object.entries(options)) {
    if (key === 'columns') {
      if (!Number.isInteger(value) || value < 1 || value > 6) throw Error('list: columns must be an integer from 1 to 6.');
      continue;
    }
    if (key === 'align') {
      const alignments = Array.isArray(value) ? value : [value];
      if (!alignments.length || alignments.length > (options.columns ?? 1) || alignments.some(alignment => !['start', 'center', 'end', 'left', 'right'].includes(alignment))) throw Error('list: align must be an alignment or an array with one alignment per column: start, center, end, left, or right.');
      continue;
    }
    if (!['title', 'search', 'placeholder', 'empty', 'columnDividers'].includes(key)) throw Error(`list: unknown option "${key}".`);
    const type = ['search', 'columnDividers'].includes(key) ? 'boolean' : 'string';
    if (typeof value !== type) throw Error(`list: ${key} must be a ${type}.`);
  }

  let depth = 0, lists = 0, row = 0;
  for (let n = index + 1; n < tokens.length; n++) {
    const token = tokens[n];
    if (token.type === 'component_close' && depth === 0) break;
    if (depth === 0) {
      if (!['bullet_list_open', 'ordered_list_open'].includes(token.type)) throw Error('list: the body must contain one Markdown list.');
      token.attrSet('role', 'list');
      lists++;
    }
    if (depth === 1 && token.type === 'list_item_open' && options.align) {
      token.attrSet('data-list-align', Array.isArray(options.align) ? options.align[row++ % (options.columns ?? 1)] ?? 'start' : options.align);
    }
    depth += token.nesting;
  }
  if (lists !== 1) throw Error('list: the body must contain one Markdown list.');

  const ui = env.ui;
  tokens[index].meta.templateEnd = `</div>${options.search ? `<p class="list-empty" hidden>${escape(options.empty ?? ui.listEmpty)}</p><span class="list-status sr-only" role="status" aria-atomic="true"></span>` : ''}</div>\n`;
  const search = options.search ? `<div class="list-filter" hidden><label class="list-search">${env.icons.search || ''}<input type="search" aria-label="${escape(options.placeholder || ui.listSearch)}" placeholder="${escape(options.placeholder ?? ui.listSearch)}" autocomplete="off" spellcheck="false"></label><button class="list-clear" type="button" aria-label="${escape(ui.searchClear)}" hidden>${env.icons.x || ''}</button></div>` : '';
  const header = options.title || options.search ? `<div class="list-header"${options.title ? '' : ' hidden'}>${options.title ? `<div class="list-title">${escape(options.title)}</div>` : ''}${search}</div>` : '';
  return `<div class="content-list" data-list-columns="${options.columns ?? 1}"${options.columnDividers === false ? ' data-list-column-dividers="false"' : ''}${options.align ? ` data-list-alignments="${escape(JSON.stringify(options.align))}"` : ''}${options.search ? ' data-list-search' : ''}>${header}<div class="list-content">`;
}
