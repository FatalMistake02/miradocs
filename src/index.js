import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import * as brands from 'simple-icons';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = s => String(s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const exists = async p => fs.access(p).then(() => true, () => false);
const name = s => s.replace(/^\d+[-_ ]*/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const segment = s => s.replace(/^\d+[-_ ]*/, '');
const slug = s => s.toLowerCase().replace(/<[^>]+>/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-');
const lucideRoot = path.dirname(createRequire(import.meta.url).resolve('lucide-static/package.json'));
const icon = async n => { try { if (!/^[a-z0-9-]+$/.test(n)) return ''; return (await fs.readFile(path.join(lucideRoot,'icons',`${n}.svg`),'utf8')).replace('<svg ', '<svg aria-hidden="true" '); } catch { return ''; } };
async function walk(dir) {
  let files=[];
  for (const e of await fs.readdir(dir,{withFileTypes:true})) { const p=path.join(dir,e.name); if(e.isDirectory()) files.push(...await walk(p)); else if(e.isFile() && /\.md$/i.test(e.name)) files.push(p); }
  return files.sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
}
function pageUrl(rel, base) { const parts=rel.replace(/\\/g,'/').replace(/\.md$/i,'').split('/').map(segment); if(parts.at(-1)==='index') parts.pop(); return base+parts.map(encodeURIComponent).join('/')+(parts.length?'/':''); }
function renderer(components) {
  const md=new MarkdownIt({html:false,linkify:true,typographer:true,highlight(code,lang){ let result=escape(code); if(lang && hljs.getLanguage(lang)) result=hljs.highlight(code,{language:lang,ignoreIllegals:true}).value; return `<div class="code-block"><div class="code-top"><span>${escape(lang||'text')}</span><button class="copy-code" type="button">Copy</button></div><pre><code class="hljs">${result}</code></pre></div>`; }});
  const original=md.renderer.rules.link_open || ((tokens,idx,opts,env,self)=>self.renderToken(tokens,idx,opts));
  md.renderer.rules.link_open=(tokens,idx,opts,env,self)=>{const href=tokens[idx].attrGet('href'); if(href?.startsWith('http')) {tokens[idx].attrSet('rel','noopener noreferrer');} return original(tokens,idx,opts,env,self)};
  function render(input, headings=[]) {
    const placeholders=[]; const lines=input.split('\n'); let inFence=false; const transformed=[];
    for(let i=0;i<lines.length;i++) {
      if(/^\s*(```|~~~)/.test(lines[i])) inFence=!inFence;
      const match=!inFence && lines[i].match(/^:::([\w-]+)(?:\s+(.*))?\s*$/);
      if(!match){transformed.push(lines[i]);continue;}
      let body=[],depth=0,fence=false,j=i+1;
      for(;j<lines.length;j++){const l=lines[j];if(/^\s*(```|~~~)/.test(l)) fence=!fence;if(!fence && /^:::[\w-]+/.test(l)) depth++;if(!fence && l===':::'){if(!depth) break;depth--;}body.push(l)}
      if(j===lines.length){transformed.push(lines[i]);continue;} i=j;
      const [,kind,arg='']=match; const content=render(body.join('\n'),headings); let output;
      if(['note','tip','caution','danger'].includes(kind)) output=`<aside class="callout ${kind}"><div class="callout-title">${escape(arg||kind[0].toUpperCase()+kind.slice(1))}</div>${content}</aside>`;
      else if(kind==='tab') output=`<section class="tab-panel" data-label="${escape(arg)}">${content}</section>`;
      else if(kind==='tabs'){const labels=[...content.matchAll(/<section class="tab-panel" data-label="([^"]*)">/g)].map(m=>m[1]);output=`<div class="tabs"><div class="tab-list" role="tablist">${labels.map((l,i)=>`<button role="tab" aria-selected="${i===0}" type="button">${l}</button>`).join('')}</div>${content}</div>`;}
      else if(components[kind]) output=components[kind].replaceAll('{{title}}',escape(arg)).replaceAll('{{content}}',content);
      else output=`<div class="component ${escape(kind)}">${content}</div>`;
      const marker=`MIRADOCSCOMPONENT${placeholders.length}END`;placeholders.push(output);transformed.push('',marker,'');
    }
    const tokens=md.parse(transformed.join('\n'),{});const ids=new Map();
    for(let i=0;i<tokens.length;i++){const token=tokens[i];if(token.type==='heading_open'){const title=tokens[i+1]?.content||'';let id=slug(title)||'section';const count=ids.get(id)||0;ids.set(id,count+1);if(count) id+=`-${count+1}`;token.attrSet('id',id);if(['h2','h3'].includes(token.tag)) headings.push([Number(token.tag[1]),title,id]);}}
    let output=md.renderer.render(tokens,md.options,{});placeholders.forEach((value,i)=>{output=output.replace(`<p>MIRADOCSCOMPONENT${i}END</p>`,value)});return output;
  }
  return render;
}
async function load(configPath) {
  const file=path.resolve(configPath);const root=path.dirname(file);const config=JSON.parse(await fs.readFile(file,'utf8'));const source=path.resolve(root,config.content||'docs');const output=path.resolve(root,config.output||'site');
  if(output===root || output===source || source.startsWith(output+path.sep) || output.startsWith(source+path.sep)) throw Error('Output must be separate from the project root and content directory.');
  const base='/'+String(config.base||'/').split('/').filter(Boolean).join('/')+(String(config.base||'/').split('/').filter(Boolean).length?'/':'');
  return {file,root,config,source,output,base};
}
export async function build(configPath='miradocs.config.json') {
  const ctx=await load(configPath);const {root,config,source,output,base}=ctx;
  const componentDir=path.resolve(root,config.components||'components'); const components={};if(await exists(componentDir)) for(const f of await fs.readdir(componentDir)) if(f.endsWith('.html')) components[path.parse(f).name]=await fs.readFile(path.join(componentDir,f),'utf8');
  const render=renderer(components);const paths=await walk(source);paths.sort((a,b)=>{const x=path.relative(source,a).replace(/\\/g,'/'),y=path.relative(source,b).replace(/\\/g,'/');return x==='index.md'?-1:y==='index.md'?1:x.localeCompare(y,'en',{numeric:true})});
  const pages=[];for(const file of paths){const rel=path.relative(source,file), parsed=matter(await fs.readFile(file,'utf8')), headings=[];const content=render(parsed.content,headings);pages.push({rel,title:parsed.data.title||name(path.parse(file).name),description:parsed.data.description||'',url:pageUrl(rel,base),headings,content,text:content.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ')});}
  if(!pages.length) throw Error('No Markdown pages found.');if(new Set(pages.map(p=>p.url)).size!==pages.length) throw Error('Two pages have the same URL.');
  await fs.rm(output,{recursive:true,force:true});await fs.mkdir(output,{recursive:true});await fs.cp(path.join(packageRoot,'assets'),path.join(output,'assets'),{recursive:true});
  for(const [dir,dest] of [[config.public||'public',output],[config.theme||'theme',path.join(output,'theme')]]) {const src=path.resolve(root,dir);if(await exists(src)) await fs.cp(src,dest,{recursive:true});}
  await fs.writeFile(path.join(output,'search.json'),JSON.stringify(pages.map(({title,description,url,text})=>({title,description,url,text}))));
  const searchIcon=await icon('search'), sunIcon=await icon('sun-moon'), menuIcon=await icon('menu'), bookIcon=await icon('book-open');
  const links=(await Promise.all((config.links||[]).map(async l=>{let image='';if(l.icon?.startsWith('custom:')) image=`<img src="${escape(l.icon.slice(7))}" alt="">`;else if(l.icon){const key='si'+l.icon.replace(/[^\w]/g,'').replace(/^\w/,c=>c.toUpperCase());image=brands[key]?.svg||await icon(l.icon)}return `<a href="${escape(l.url)}">${image}<span>${escape(l.label)}</span></a>`}))).join('');
  const groups=new Map();for(const p of pages){const bits=p.rel.split(path.sep);const group=bits.length>1?name(bits[0]):'Overview';if(!groups.has(group)) groups.set(group,[]);groups.get(group).push(p);}
  for(let i=0;i<pages.length;i++){const p=pages[i];const nav=[...groups].map(([g,items])=>`<div class="nav-group"><div class="nav-label">${escape(g)}</div>${items.map(x=>`<a class="nav-link ${x===p?'active':''}" href="${escape(x.url)}" ${x===p?'aria-current="page"':''}>${escape(x.title)}</a>`).join('')}</div>`).join('');const toc=p.headings.map(([level,title,id])=>`<a class="toc-level-${level}" href="#${escape(id)}">${escape(title)}</a>`).join('');
    const pager=(page,label,arrow)=>page?`<a class="pager-link" href="${escape(page.url)}"><span>${label}</span><strong>${arrow[0]} ${escape(page.title)} ${arrow[1]}</strong></a>`:'<span></span>';
    const styles=(config.styles||[]).map(f=>`<link rel="stylesheet" href="${escape(base+'theme/'+f)}">`).join('');const title=escape(config.title||'miradocs');
    const document=`<!doctype html><html lang="${escape(config.language||'en')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escape(p.description)}"><title>${escape(p.title)} | ${title}</title><script>try{document.documentElement.dataset.theme=localStorage.getItem('miradocs-theme')||'system'}catch(e){}</script><link rel="stylesheet" href="${base}assets/style.css">${styles}</head><body data-base="${escape(base)}"><a class="skip-link" href="#main">Skip to content</a><header class="topbar"><a class="brand" href="${base}"><span class="brand-mark">${bookIcon}</span><span>${title}</span></a><div class="top-actions"><nav class="header-links" aria-label="Links">${links}</nav><button class="search-trigger" type="button" aria-label="Search documentation">${searchIcon}<span class="search-placeholder">Search documentation</span><kbd>Ctrl K</kbd></button><button class="theme-toggle icon-button" type="button" aria-label="Change color theme" title="Change color theme">${sunIcon}</button><button class="menu-toggle icon-button" type="button" aria-label="Open navigation" aria-expanded="false">${menuIcon}</button></div></header><div class="layout"><aside class="sidebar"><div class="sidebar-inner"><nav aria-label="Documentation">${nav}</nav></div></aside><main id="main" class="main"><div class="eyebrow">DOCUMENTATION <span>/</span> ${escape(p.title)}</div><h1>${escape(p.title)}</h1><p class="lede">${escape(p.description)}</p><div class="article">${p.content}</div><div class="pagination">${pager(pages[i-1],'Previous',['←',''])}${pager(pages[i+1],'Next',['','→'])}</div><footer>Built with ${title}</footer></main><aside class="toc"><div class="toc-inner"><div class="toc-title">On this page</div>${toc}</div></aside></div><dialog class="search-dialog"><div class="search-box"><div class="search-input-wrap">${searchIcon}<input type="search" placeholder="Search the docs..." aria-label="Search the docs"><kbd>ESC</kbd></div><div class="search-results"></div><div class="search-footer"><span>↑↓ Navigate &nbsp; ↵ Select</span><span>SEARCH</span></div></div></dialog><script src="${base}assets/app.js" defer></script></body></html>`;
    const dest=path.join(output,...p.url.slice(base.length).split('/').filter(Boolean),'index.html');await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,document);
  }
  console.log(`Built ${pages.length} pages in ${output}`);return ctx;
}
export async function serve(configPath,port=8000){let ctx=await build(configPath);const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};http.createServer(async(req,res)=>{try{let url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!url.startsWith(ctx.base)){res.writeHead(404).end('Not found');return}let file=path.resolve(ctx.output,'.'+path.sep+url.slice(ctx.base.length));if(!file.startsWith(ctx.output+path.sep)&&file!==ctx.output) throw Error();let stat=await fs.stat(file);if(stat.isDirectory()) file=path.join(file,'index.html');res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream'});res.end(await fs.readFile(file));}catch{res.writeHead(404).end('Not found')}}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://localhost:${port}${ctx.base} (restart after edits)`));}
