import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import matter from 'gray-matter';
import { loadConfig } from './config.js';
import { createMarkdown } from './markdown.js';
import { autoNavigation, resolveNavigation } from './navigation.js';
import { icon } from './icons.js';
import { messages } from './i18n.js';
import { layout } from './layout.js';
import { clean, label, exists, escape, walk, inside } from './utils.js';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const marker = '.miradocs-output';
export async function build(configPath = 'miradocs.config.json', options = {}) {
  const ctx = await loadConfig(configPath);
  const { config, root, source, output, base, locales } = ctx;
  if (await exists(output) && !(await exists(path.join(output, marker))) && (await fs.readdir(output)).length) throw Error(`Refusing to replace ${output}: it is not a miradocs output directory. Choose an empty output folder.`);
  const components = {};
  if (await exists(ctx.components)) for (const file of await walk(ctx.components)) if (file.endsWith('.html')) components[path.basename(file, '.html')] = await fs.readFile(file, 'utf8');
  const icons = {};
  for (const name of ['book-open','search','sun-moon','menu','chevron-down','chevron-right','arrow-left','arrow-right','square-pen','languages','info','lightbulb','triangle-alert','octagon-alert','link']) icons[name] = await icon(name, base);
  icons.note = icons.info; icons.tip = icons.lightbulb; icons.caution = icons['triangle-alert']; icons.danger = icons['octagon-alert'];
  for (const [i, link] of (config.links || []).entries()) icons['link' + i] = link.icon ? await icon(link.icon, base) : '';
  const render = createMarkdown(components, { base, rawHtml: config.markdown?.html === true });
  const pages = [];
  for (const [locale, settings] of Object.entries(locales)) {
    const directory = path.join(source, settings.path), ui = messages(locale, settings);
    const files = (await walk(directory)).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const rel = path.relative(source, file).replaceAll('\\','/'), relative = path.relative(directory, file).replaceAll('\\','/');
      // The root locale does not consume other locale folders.
      if (!settings.path && Object.values(locales).some(l => l.path && relative.startsWith(l.path + '/'))) continue;
      const { data, content: markdown } = matter(await fs.readFile(file, 'utf8'));
      if (data.draft === true && !options.drafts) continue;
      if (data.title !== undefined && typeof data.title !== 'string') throw Error(`${rel}: title must be a string.`);
      if (data.description !== undefined && typeof data.description !== 'string') throw Error(`${rel}: description must be a string.`);
      if (data.order !== undefined && !Number.isFinite(Number(data.order))) throw Error(`${rel}: order must be a number.`);
      const parts = relative.replace(/\.md$/, '').split('/').map(clean); if (parts.at(-1) === 'index') parts.pop();
      const key = parts.join('/'), url = base + (settings.path ? settings.path + '/' : '') + parts.map(encodeURIComponent).join('/') + (parts.length ? '/' : '');
      let rendered;
      try { rendered = render(markdown, { ui, icons }); } catch (error) { throw Error(`${rel}: ${error.message}`); }
      pages.push({ ...rendered, locale, rel, relative, key, url, title: data.title || label(path.basename(file, '.md')), description: data.description || '', layout: data.layout === 'landing' ? 'landing' : 'docs', sidebar: data.sidebar, search: data.search, order: Number(data.order ?? 0) });
    }
  }
  pages.sort((a,b) => a.locale.localeCompare(b.locale) || (a.key === '' ? -1 : b.key === '' ? 1 : a.order - b.order || a.relative.localeCompare(b.relative,'en',{numeric:true})));
  if (!pages.length) throw Error('No Markdown pages found.');
  const urls = new Set(); for (const page of pages) { const key = page.url.toLowerCase(); if (urls.has(key)) throw Error(`Two pages have the same URL: ${page.url}`); urls.add(key); }
  // Resolve links to Markdown sources, including numbered filenames.
  for (const page of pages) page.content = page.content.replace(/href="([^"]+\.md)(#[^"]*)?"/g, (match, href, hash = '') => {
    if(/^(https?:|\/\/)/.test(href)) return match;
    const target = href.startsWith('/') ? path.posix.join(locales[page.locale].path, decodeURI(href.slice(base.length))) : path.posix.normalize(path.posix.join(path.posix.dirname(page.rel), decodeURI(href)));
    const found = pages.find(p => p.rel === target);
    if (!found) throw Error(`${page.rel}: linked page not found: ${href}`);
    return `href="${found.url}${hash}"`;
  });
  const stage = output + '.tmp-' + randomUUID(), backup = output + '.previous-' + randomUUID();
  await fs.mkdir(stage, { recursive: true });
  try {
    await fs.cp(path.join(packageRoot, 'assets'), path.join(stage, 'assets'), { recursive: true });
    const fusePath = createRequire(import.meta.url).resolve('fuse.js/min');
    await fs.copyFile(fusePath.replace(/\.cjs$/, '.mjs'), path.join(stage, 'assets', 'fuse.js'));
    for (const [dir, dest] of [[ctx.publicDir, stage], [ctx.theme, path.join(stage, 'theme')]]) {
      if (await exists(dir)) {
        await walk(dir);
        if (dir === ctx.publicDir) for (const entry of await fs.readdir(dir)) if (['assets','theme','index.html','404.html','sitemap.xml',marker].includes(entry) || /^search.*\.json$/.test(entry)) throw Error(`public/${entry} conflicts with generated output.`);
        await fs.cp(dir, dest, { recursive: true });
      }
    }
    for (const style of config.styles || []) if (!(await exists(path.join(stage,'theme',style)))) throw Error(`Theme stylesheet not found: ${style}`);
    for (const [locale, settings] of Object.entries(locales)) {
      const localized = pages.filter(p => p.locale === locale), ui = messages(locale, settings);
      if (!localized.length) throw Error(`No pages found for locale ${locale}.`);
      const sidebar = settings.sidebar || config.sidebar;
      const navigation = sidebar ? resolveNavigation(sidebar, localized, base) : autoNavigation(localized);
      for (const page of localized) {
        const destination = path.join(stage, page.url.slice(base.length), 'index.html');
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, layout(ctx, page, pages, navigation, icons, ui, options));
      }
      const index = localized.filter(p => p.search !== false).flatMap(p => {
        const text = p.content.replace(/<[^>]*>/g,' ').replace(/&(?:amp|lt|gt|quot|#39);/g, s => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"})[s]).replace(/\s+/g,' ').trim();
        return [{ title: p.title, description: p.description, url: p.url, text }];
      });
      await fs.writeFile(path.join(stage, `search-${locale}.json`), JSON.stringify(index));
      if (locale === Object.keys(locales)[0]) await fs.writeFile(path.join(stage, 'search.json'), JSON.stringify(index));
      const missing = { locale, key: '', url: base + '404.html', title: ui.notFound, description: ui.notFoundText, headings: [], content: `<p><a href="${base + (settings.path ? settings.path + '/' : '')}">${escape(ui.home)}</a></p>` };
      const missingFile = settings.path ? path.join(stage, settings.path, '404.html') : path.join(stage,'404.html');
      await fs.mkdir(path.dirname(missingFile),{recursive:true});
      await fs.writeFile(missingFile, layout(ctx,missing,pages,navigation,icons,ui,{...options,notFound:true}));
    }
    if (!(await exists(path.join(stage,'index.html')))) await fs.writeFile(path.join(stage,'index.html'),`<!doctype html><meta http-equiv="refresh" content="0;url=${escape(pages[0].url)}"><a href="${escape(pages[0].url)}">Documentation</a>`);
    if (config.strictLinks !== false) for(const page of pages) {
      for(const match of page.content.matchAll(/(?:href|src)="([^"]+)"/g)) {
        const href = match[1].replaceAll('&amp;','&');
        if(/^(https?:|mailto:|tel:|data:|\/\/)/i.test(href)) continue;
        const url = new URL(href, 'https://miradocs.local'+page.url);
        if(!url.pathname.startsWith(base)) throw Error(`${page.rel}: link is outside the configured base: ${href}`);
        let file = path.resolve(stage,decodeURIComponent(url.pathname.slice(base.length)));
        if(!inside(stage,file)) throw Error(`${page.rel}: invalid link: ${href}`);
        if(await exists(file) && (await fs.stat(file)).isDirectory()) file=path.join(file,'index.html');
        if(!(await exists(file))) throw Error(`${page.rel}: broken link or missing asset: ${href}`);
        if(url.hash && file.endsWith('.html')) {
          const html = await fs.readFile(file,'utf8');
          if(!html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) throw Error(`${page.rel}: missing fragment: ${href}`);
        }
      }
    }
    if (config.site) {
      await fs.writeFile(path.join(stage,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${escape(new URL(p.url,config.site).href)}</loc></url>`).join('')}</urlset>`);
      await fs.writeFile(path.join(stage,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL(base+'sitemap.xml',config.site).href}\n`);
    }
    await fs.writeFile(path.join(stage, marker), 'Generated by miradocs. Safe to replace.\n');
    const hadOutput = await exists(output);
    if (hadOutput) await fs.rename(output, backup);
    try { await fs.rename(stage, output); } catch (error) { if(hadOutput) await fs.rename(backup,output); throw error; }
    if (hadOutput) await fs.rm(backup, { recursive: true, force: true });
  } catch (error) { await fs.rm(stage,{recursive:true,force:true}); throw error; }
  console.log(`Built ${pages.length} pages in ${output}`);
  return { ...ctx, pages };
}
export { serve } from './server.js';
