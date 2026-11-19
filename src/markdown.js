import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import taskLists from 'markdown-it-task-lists';
import hljs from 'highlight.js';
import { escape, slug, localUrl } from './utils.js';
import { parseFileTree, renderFileTree } from './file-tree.js';

function addClasses(html, classes = []) {
  if (!classes.length) return html;
  return html.replace(/<([a-z][a-z0-9-]*)\b([^>]*)>/i, (tag, name, attributes) => {
    const value = classes.join(' ');
    const classAttribute = /(\s)class=(["'])(.*?)\2/i;
    return classAttribute.test(attributes)
      ? `<${name}${attributes.replace(classAttribute, (_, space, quote, current) => `${space}class=${quote}${current} ${value}${quote}`)}>`
      : `<${name}${attributes} class="${value}">`;
  });
}

export function createMarkdown(components, { base = '/', rawHtml = false, clientComponents = {} } = {}) {
  const md = new MarkdownIt({ html: rawHtml, linkify: true, typographer: true }).use(footnote).use(taskLists, { label: true });
  md.block.ruler.before('fence', 'component', (state, start, end, silent) => {
    const line = n => state.src.slice(state.bMarks[n] + state.tShift[n], state.eMarks[n]);
    const match = line(start).match(/^:::([\w-]+)(?:\s+(.*))?$/);
    if (!match) return false;
    if (silent) return true;
    let title = match[2] || '';
    const attributes = title.match(/\s*\{((?:\.[A-Za-z_][\w-]*\s*)+)\}\s*$/);
    const classes = attributes ? attributes[1].trim().split(/\s+/).map(value => value.slice(1)) : [];
    if (attributes) title = title.slice(0, attributes.index).trimEnd();
    let depth = 0, next = start + 1, fence;
    for (; next < end; next++) {
      const value = line(next), marker = value.match(/^\s*(`{3,}|~{3,})/);
      if (marker) { if (!fence) fence = marker[1]; else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null; }
      if (fence) continue;
      if (/^:::[\w-]+/.test(value)) depth++;
      if (value === ':::') { if (!depth) break; depth--; }
    }
    if (next === end) throw Error(`Unclosed ${match[1]} component near line ${start + 1}.`);
    if(match[1] === 'file-tree') {
      const token = state.push('file_tree','div',0);
      token.meta = {title,classes,nodes:parseFileTree(state.getLines(start+1,next,state.blkIndent,true),state.md)};
      token.block = true;state.line = next+1;return true;
    }
    const open = state.push('component_open', 'div', 1);
    open.meta = { name: match[1], title, classes }; open.block = true;
    const oldMax = state.lineMax, oldParent = state.parentType;
    state.lineMax = next; state.parentType = 'container';
    state.md.block.tokenize(state, start + 1, next);
    const close = state.push('component_close', 'div', -1); close.meta = open.meta; close.block = true;
    state.lineMax = oldMax; state.parentType = oldParent; state.line = next + 1;
    return true;
  }, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });
  md.renderer.rules.file_tree = (tokens,i,options,env) => addClasses(renderFileTree(tokens[i].meta,md,env),tokens[i].meta.classes);

  md.renderer.rules.fence = (tokens, i, options, env) => {
    const token = tokens[i], [language = '', ...rest] = token.info.trim().split(/\s+/);
    let code = escape(token.content);
    if (hljs.getLanguage(language)) code = hljs.highlight(token.content, { language, ignoreIllegals: true }).value;
    const title = rest.join(' ').replace(/^title=["']?|["']$/g, '') || language || 'text';
    return `<div class="code-block"><div class="code-top"><span>${escape(title)}</span><button class="copy-code" type="button" aria-label="${escape(env.ui.copy)}">${escape(env.ui.copy)}</button></div><pre tabindex="0"><code class="hljs language-${escape(language)}">${code}</code></pre></div>\n`;
  };
  md.renderer.rules.component_open = (tokens, i, options, env) => {
    const meta = tokens[i].meta, title = escape(meta.title), kind = meta.name;
    if(Object.hasOwn(clientComponents,kind)) {
      let props;
      try{props=JSON.parse(meta.title || '{}');}catch{throw Error(`${kind}: component props must be a JSON object.`);}
      if(!props || Array.isArray(props) || typeof props !== 'object')throw Error(`${kind}: component props must be a JSON object.`);
      const component=clientComponents[kind];env.usedComponents?.add(kind);
      return `<div class="client-component" data-component="${kind}" data-component-src="${escape(component.url)}" data-component-load="${component.load || 'visible'}" data-component-props="${escape(JSON.stringify(props))}">`;
    }
    if (['note', 'tip', 'caution', 'danger'].includes(kind)) return `<aside class="callout ${kind}"><div class="callout-title">${env.icons[kind]}${title || escape(env.ui[kind])}</div>`;
    if (kind === 'tabs') {
      const tabs = []; let depth = 0;
      for (let n = i + 1; n < tokens.length; n++) { if (tokens[n].type === 'component_close' && !depth) break; if (tokens[n].type === 'component_open') { if (!depth && tokens[n].meta.name === 'tab') tabs.push(tokens[n].meta); depth++; } else if (tokens[n].type === 'component_close') depth--; }
      if (!tabs.length) throw Error('tabs must contain at least one tab.');
      return `<div class="tabs"><div class="tab-list" role="tablist" aria-label="${title || 'Content options'}">${tabs.map((tab, n) => `<button type="button" id="${tab.id}-tab" role="tab" aria-controls="${tab.id}" aria-selected="${n === 0}" tabindex="${n ? -1 : 0}">${escape(tab.title)}</button>`).join('')}</div>`;
    }
    if (kind === 'tab') return `<section class="tab-panel" role="tabpanel" id="${meta.id}" aria-labelledby="${meta.id}-tab" tabindex="0">`;
    if (kind === 'details') return `<details class="details"><summary>${title}</summary><div>`;
    if (kind === 'steps') return '<div class="steps">';
    if (kind === 'cards') return '<div class="cards">';
    if (kind === 'badge') return `<div class="badge">${title}`;
    if ((kind === 'card' || kind === 'button') && !components[kind]) {
      const [text, url] = meta.title.split(/\s+\|\s+/);
      const href = url && md.validateLink(url) ? localUrl(base,url) : '';
      if(kind === 'card') {
        meta.templateEnd = '</div>\n';
        return `<div class="content-card"><strong>${href ? `<a href="${escape(href)}">${escape(text)}</a>` : escape(text)}</strong>`;
      }
      meta.templateEnd = href ? '</a>\n' : '</div>\n';
      return `<${href ? `a href="${escape(href)}"` : 'div'} class="${kind === 'button' ? 'action-button' : 'content-card'}">${kind === 'card' ? `<strong>${escape(text)}</strong>` : escape(text)}`;
    }
    const template = components[kind];
    if (!template) throw Error(`Unknown component: ${kind}. Add components/${kind}.html.`);
    const parts = template.split('{{content}}');
    if (parts.length !== 2) throw Error(`${kind}.html must contain exactly one {{content}} placeholder.`);
    meta.templateEnd = parts[1].replaceAll('{{title}}', title);
    return parts[0].replaceAll('{{title}}', title);
  };
  const renderComponent = md.renderer.rules.component_open;
  md.renderer.rules.component_open = (tokens,i,...args) => addClasses(renderComponent(tokens,i,...args),tokens[i].meta.classes);
  md.renderer.rules.component_close = (tokens, i) => {
    const meta = tokens[i].meta;
    if (['note', 'tip', 'caution', 'danger'].includes(meta.name)) return '</aside>\n';
    if (meta.name === 'tab') return '</section>\n';
    if (meta.name === 'details') return '</div></details>\n';
    return meta.templateEnd ?? '</div>\n';
  };
  md.renderer.rules.heading_close = (tokens, i, options, env, self) => `${tokens[i].meta?.id ? `<a class="heading-anchor" href="#${tokens[i].meta.id}" aria-label="${escape(env.ui.linkToSection)}">${env.icons.link || '#'}</a>` : ''}${self.renderToken(tokens,i,options)}`;
  const link = md.renderer.rules.link_open || ((tokens, i, options, env, self) => self.renderToken(tokens, i, options));
  md.renderer.rules.link_open = (tokens, i, options, env, self) => {
    const token = tokens[i]; let url = token.attrGet('href');
    if (url.startsWith('/') && !url.startsWith('//')) url = localUrl(base, url);
    token.attrSet('href', url);
    if (/^https?:/.test(url)) token.attrSet('rel', 'noopener noreferrer');
    return link(tokens, i, options, env, self);
  };
  const image = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, i, options, env, self) => {
    const token = tokens[i], url = token.attrGet('src');
    if (url.startsWith('/')) token.attrSet('src', localUrl(base, url));
    token.attrSet('loading', 'lazy'); token.attrSet('decoding', 'async');
    return image(tokens, i, options, env, self);
  };
  return (source, env) => {
    const tokens = md.parse(source, env), headings = [], ids = new Map(), parents = []; let tabId = 0;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if(token.type === 'component_open') {
        if(token.meta.name === 'tab' && parents.at(-1) !== 'tabs') throw Error('tab must be a direct child of tabs.');
        parents.push(token.meta.name);
      } else if(token.type === 'component_close') parents.pop();
      if (token.type === 'heading_open') {
        const title = tokens[i + 1].children.filter(t => t.type !== 'html_inline').map(t => t.content).join('');
        const raw = slug(title), count = ids.get(raw) || 0; ids.set(raw, count + 1);
        const id = raw + (count ? `-${count + 1}` : ''); token.attrSet('id', id);
        if(tokens[i+2]?.type === 'heading_close') tokens[i+2].meta = {id};
        if (Number(token.tag[1]) >= 2) headings.push([Number(token.tag[1]), title, id]);
      }
      if (token.type === 'component_open' && token.meta.name === 'tab') token.meta.id = `tab-${++tabId}`;
    }
    return { content: md.renderer.render(tokens, md.options, env), headings };
  };
}
