import { escape } from './utils.js';
import { parseComponentOptions } from './component-options.js';

export function renderTable(tokens, index, env) {
  const title = tokens[index].meta.title;
  const options = title.startsWith('{') ? parseComponentOptions(title, 'table') : { title };
  const allowedAlignments = ['start', 'center', 'end', 'left', 'right'];
  for (const [key, value] of Object.entries(options)) {
    if (key === 'align') {
      if (!(typeof value === 'string' && allowedAlignments.includes(value)) && !(Array.isArray(value) && value.length && value.every(item => allowedAlignments.includes(item)))) throw Error('table: align must be an alignment or an array of column alignments.');
    } else {
      const type = ['search', 'columnDividers', 'rowDividers', 'striped'].includes(key) ? 'boolean' : 'string';
      if (!['title', 'search', 'placeholder', 'empty', 'columnDividers', 'rowDividers', 'striped'].includes(key)) throw Error(`table: unknown option "${key}".`);
      if (typeof value !== type) throw Error(`table: ${key} must be a ${type}.`);
    }
  }
  let depth = 0, tables = 0, columns = 0, column = 0;
  const cells = [];
  for (let n = index + 1; n < tokens.length; n++) {
    const token = tokens[n];
    if (token.type === 'component_close' && depth === 0) break;
    if (depth === 0) {
      if (token.type !== 'table_open') throw Error('table: the body must contain one Markdown table.');
      tables++;
      if (options.title) token.attrSet('aria-label', options.title);
    }
    if (token.type === 'tr_open') column = 0;
    if (['th_open', 'td_open'].includes(token.type)) {
      if (token.type === 'th_open') { columns++; token.attrSet('scope', 'col'); }
      cells.push({ token, column: column++ });
    }
    depth += token.nesting;
  }
  if (tables !== 1) throw Error('table: the body must contain one Markdown table.');
  if (Array.isArray(options.align) && options.align.length > columns) throw Error('table: align cannot contain more values than there are columns.');
  for (const { token, column } of cells) {
    const alignment = Array.isArray(options.align) ? options.align[column] : options.align;
    const selected = alignment || token.attrGet('style')?.match(/text-align:(left|center|right)/)?.[1];
    if (selected) token.attrSet('style', `--table-cell-align:${selected}`);
  }
  const ui = env.ui;
  const search = options.search ? `<div class="list-filter" hidden><label class="list-search">${env.icons.search || ''}<input type="search" aria-label="${escape(options.placeholder || ui.tableSearch)}" placeholder="${escape(options.placeholder ?? ui.tableSearch)}" autocomplete="off" spellcheck="false"></label><button class="list-clear" type="button" aria-label="${escape(ui.searchClear)}" hidden>${env.icons.x || ''}</button></div>` : '';
  const header = options.title || options.search ? `<div class="list-header"${options.title ? '' : ' hidden'}>${options.title ? `<div class="list-title">${escape(options.title)}</div>` : ''}${search}</div>` : '';
  tokens[index].meta.templateEnd = `</div>${options.search ? `<p class="list-empty" hidden>${escape(options.empty ?? ui.listEmpty)}</p><span class="list-status sr-only" role="status" aria-atomic="true"></span>` : ''}</div>\n`;
  return `<div class="content-list content-table"${options.search ? ' data-list-search' : ''}${options.columnDividers === false ? ' data-table-columns="false"' : ''}${options.rowDividers === false ? ' data-table-rows="false"' : ''}${options.striped ? ' data-table-striped' : ''}>${header}<div class="list-content table-scroll" role="region" aria-label="${escape(options.title || ui.tableSearch)}" tabindex="0">`;
}
