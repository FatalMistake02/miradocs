import { escape, localUrl, safeUrl } from './utils.js';
import { fileTypeIcon } from './file-icons.js';

function readList(tokens, start) {
  const nodes = [];
  let cursor = start + 1;
  while (cursor < tokens.length && !['bullet_list_close','ordered_list_close'].includes(tokens[cursor].type)) {
    if (tokens[cursor].type !== 'list_item_open') throw Error('File trees must contain a nested Markdown list.');
    cursor++;
    const node = { label:'', children:[] };
    while (cursor < tokens.length && tokens[cursor].type !== 'list_item_close') {
      const token = tokens[cursor];
      if (['bullet_list_open','ordered_list_open'].includes(token.type)) {
        const child = readList(tokens,cursor); node.children.push(...child.nodes); cursor = child.end;
      } else if (token.type === 'inline' && !node.label) { node.label = token.content; cursor++; }
      else if (['paragraph_open','paragraph_close'].includes(token.type)) cursor++;
      else throw Error('File-tree items support a filename, optional description, and nested files.');
    }
    if (!node.label) throw Error('File-tree entries need a name.');
    nodes.push(node); cursor++;
  }
  return { nodes, end:cursor + 1 };
}

export function parseFileTree(source, md) {
  const tokens = md.parse(source,{});
  if (!tokens.length || !['bullet_list_open','ordered_list_open'].includes(tokens[0].type)) throw Error('Use a nested Markdown list inside file-tree.');
  const result = readList(tokens,0);
  if(result.end !== tokens.length) throw Error('File-tree content must be a single list.');
  return result.nodes;
}

export function renderFileTree(meta, md, env, base = '/') {
  let options = { title:meta.title, collapsed:false };
  if(meta.title.startsWith('{')) {
    try { options = JSON.parse(meta.title); } catch { throw Error('file-tree options must be valid JSON.'); }
    if(!options || Array.isArray(options) || typeof options !== 'object' || (options.title !== undefined && typeof options.title !== 'string') || (options.collapsed !== undefined && typeof options.collapsed !== 'boolean')) throw Error('file-tree accepts a title string and a collapsed boolean.');
  }
  if (options.icons !== undefined && options.icons !== false && (!options.icons || Array.isArray(options.icons) || typeof options.icons !== 'object' || Object.values(options.icons).some(value=>typeof value !== 'string'))) throw Error('file-tree icons must be false or an object mapping filenames and extensions to image URLs.');
  const renderNodes = nodes => `<ul class="file-tree-list">${nodes.map(node => {
    const [name,...description] = node.label.split(/\s+[—–]\s+/);
    const plainName = md.parseInline(name,{})[0].children.filter(token=>['text','code_inline'].includes(token.type)).map(token=>token.content).join('');
    const folder = node.children.length > 0 || plainName.endsWith('/');
    let icon = folder ? 'folder' : /\.(?:svg|png|jpe?g|gif|webp|avif|ico)$/i.test(plainName) ? 'file-image' : /\.(?:jsx?|tsx?|vue|svelte|html|css|sh|py|rs|go)$/i.test(plainName) ? 'file-code' : /\.(?:json|ya?ml|toml)$/i.test(plainName) ? 'file-json' : 'file-text';
    const type = !folder && options.icons !== false ? fileTypeIcon(plainName) : null;
    const extension = '.'+plainName.split('.').at(-1).toLowerCase();
    const custom = !folder && options.icons && (Object.hasOwn(options.icons,plainName) ? options.icons[plainName] : Object.hasOwn(options.icons,extension) ? options.icons[extension] : null);
    const graphic = custom ? `<img class="file-type-image" src="${escape(localUrl(base,safeUrl(custom)))}" alt="" loading="lazy" decoding="async">` : (type?.lucide ? env.icons[type.lucide] : type?.svg) || env.icons[icon];
    const row = `<span class="file-tree-chevron">${node.children.length ? env.icons['chevron-down'] : ''}</span><span class="file-tree-icon"${type && !custom ? ` data-file-type="${type.type}" style="--file-icon-color:${type.color}"` : ''}>${graphic}${folder ? `<span class="file-tree-folder-open">${env.icons['folder-open']}</span>` : ''}</span><span class="file-tree-name">${md.renderInline(name)}</span>${description.length ? `<span class="file-tree-description">${md.renderInline(description.join(' — '))}</span>` : ''}`;
    return `<li class="file-tree-node ${folder ? 'is-folder' : 'is-file'}">${node.children.length ? `<details class="file-tree-directory" ${options.collapsed ? '' : 'open'}><summary class="file-tree-row">${row}</summary>${renderNodes(node.children)}</details>` : `<div class="file-tree-row">${row}</div>`}</li>`;
  }).join('')}</ul>`;
  return `<div class="file-tree" role="group" aria-label="${escape(options.title || env.ui.fileTree)}">${options.title ? `<div class="file-tree-title"><span>${escape(options.title)}</span></div>` : ''}<div class="file-tree-content">${renderNodes(meta.nodes)}</div></div>\n`;
}
