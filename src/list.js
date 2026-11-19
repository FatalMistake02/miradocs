import { escape } from './utils.js';

export function renderList(tokens, index, env) {
  const title = tokens[index].meta.title;
  let options = { title };
  if (title.startsWith('{')) {
    try { options = JSON.parse(title); }
    catch { throw Error('list: options must be a JSON object.'); }
  }
  if (!options || Array.isArray(options) || typeof options !== 'object') throw Error('list: options must be a JSON object.');
  for (const [key, value] of Object.entries(options)) {
    if (!['title', 'search', 'placeholder', 'empty'].includes(key)) throw Error(`list: unknown option "${key}".`);
    if (typeof value !== (key === 'search' ? 'boolean' : 'string')) throw Error(`list: ${key} must be a ${key === 'search' ? 'boolean' : 'string'}.`);
  }

  let depth = 0, lists = 0;
  for (let n = index + 1; n < tokens.length; n++) {
    const token = tokens[n];
    if (token.type === 'component_close' && depth === 0) break;
    if (depth === 0) {
      if (!['bullet_list_open', 'ordered_list_open'].includes(token.type)) throw Error('list: the body must contain one Markdown list.');
      lists++;
    }
    depth += token.nesting;
  }
  if (lists !== 1) throw Error('list: the body must contain one Markdown list.');

  const ui = env.ui;
  tokens[index].meta.templateEnd = `</div>${options.search ? `<p class="list-empty" hidden>${escape(options.empty ?? ui.listEmpty)}</p><span class="list-status sr-only" role="status" aria-atomic="true"></span>` : ''}</div>\n`;
  return `<div class="content-list"${options.search ? ' data-list-search' : ''}>${options.title ? `<div class="list-title">${escape(options.title)}</div>` : ''}${options.search ? `<div class="list-filter" hidden><label class="list-search">${env.icons.search || ''}<input type="search" aria-label="${escape(options.placeholder || ui.listSearch)}" placeholder="${escape(options.placeholder ?? ui.listSearch)}" autocomplete="off" spellcheck="false"></label><button class="list-clear" type="button" aria-label="${escape(ui.searchClear)}" hidden>${env.icons.x || ''}</button></div>` : ''}<div class="list-content">`;
}
