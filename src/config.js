import fs from 'node:fs/promises';
import path from 'node:path';
import { exists, inside, safeUrl } from './utils.js';

export async function loadConfig(configPath = 'miradocs.config.json') {
  const file = path.resolve(configPath), root = path.dirname(file);
  const config = JSON.parse((await fs.readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
  if (!config || Array.isArray(config) || typeof config !== 'object') throw Error('Configuration must be an object.');
  for (const key of ['title', 'base', 'content', 'output', 'theme', 'components', 'public', 'language', 'site', 'logo', 'favicon', 'editUrl']) {
    if (config[key] !== undefined && typeof config[key] !== 'string') throw Error(`${key} must be a string.`);
  }
  const source = path.resolve(root, config.content || 'docs'), output = path.resolve(root, config.output || 'site');
  const theme = path.resolve(root, config.theme || 'theme'), components = path.resolve(root, config.components || 'components'), publicDir = path.resolve(root, config.public || 'public');
  if (!inside(root, output) || output === root || [source, theme, components, publicDir, path.join(root,'src'), path.join(root,'assets'), path.join(root,'node_modules'), path.join(root,'.git')].some(dir => inside(output, dir) || inside(dir, output))) throw Error('Output must be separate from source directories and inside the project.');
  if (await exists(output) && (await fs.lstat(output)).isSymbolicLink()) throw Error('Output cannot be a symbolic link.');
  let ancestor = path.dirname(output);
  while(ancestor !== root && inside(root,ancestor)) {
    if(await exists(ancestor) && (await fs.lstat(ancestor)).isSymbolicLink()) throw Error('Output ancestors cannot be symbolic links.');
    ancestor = path.dirname(ancestor);
  }
  const base = '/' + (config.base || '/').split('/').filter(Boolean).join('/') + ((config.base || '/').split('/').filter(Boolean).length ? '/' : '');
  if (!/^\/(?:[\w.-]+\/)*$/.test(base) || base.split('/').includes('..')) throw Error('base must be a URL path such as /docs/.');
  if (config.site && !/^https?:\/\//.test(config.site)) throw Error('site must be an absolute HTTP URL.');
  if(config.site) { const site=new URL(config.site); if(site.username || site.password || site.hash || site.search) throw Error('site must not contain credentials, a query, or a fragment.'); }
  for(const key of ['logo','favicon','editUrl']) if(config[key]) safeUrl(config[key],key);
  if(config.search !== undefined && config.search !== false && (typeof config.search !== 'object' || Array.isArray(config.search))) throw Error('search must be false or an object.');
  if(config.search?.limit !== undefined && (!Number.isInteger(config.search.limit) || config.search.limit < 1 || config.search.limit > 50)) throw Error('search.limit must be an integer from 1 to 50.');
  if(config.search?.threshold !== undefined && (typeof config.search.threshold !== 'number' || config.search.threshold < 0 || config.search.threshold > 1)) throw Error('search.threshold must be between 0 and 1.');
  if(config.sidebar && !Array.isArray(config.sidebar)) throw Error('sidebar must be an array.');
  if(config.clientNavigation !== undefined && typeof config.clientNavigation !== 'boolean') throw Error('clientNavigation must be a boolean.');
  if(config.links && !Array.isArray(config.links)) throw Error('links must be an array.');
  for (const link of config.links || []) { if (!link.label) throw Error('Every header link needs a label.'); safeUrl(link.url, 'header link'); }
  if (config.styles && (!Array.isArray(config.styles) || config.styles.some(s => typeof s !== 'string' || s.includes('..') || path.isAbsolute(s)))) throw Error('styles must contain paths inside the theme folder.');
  if(config.scripts && (!Array.isArray(config.scripts) || config.scripts.some(s=>typeof s !== 'string'))) throw Error('scripts must be an array of URLs.');
  for(const script of config.scripts || []) safeUrl(script,'script');
  const reserved = new Set(['note','tip','caution','danger','tabs','tab','details','steps','group','cards','card','button','file-tree','badge','constructor','prototype']);
  if(config.clientComponents && (typeof config.clientComponents !== 'object' || Array.isArray(config.clientComponents))) throw Error('clientComponents must be an object.');
  for(const [name,component] of Object.entries(config.clientComponents || {})) {
    if(!/^[a-z][a-z0-9-]*$/.test(name) || reserved.has(name)) throw Error(`Invalid or reserved client component name: ${name}`);
    if(!component || typeof component !== 'object' || typeof component.src !== 'string' || !component.src.trim()) throw Error(`${name}: client components need a src module.`);
    if(!['react','vue','svelte','module'].includes(component.framework)) throw Error(`${name}: framework must be react, vue, svelte, or module.`);
    if(component.load && !['eager','idle','visible'].includes(component.load)) throw Error(`${name}: load must be eager, idle, or visible.`);
    if(component.export && !/^[A-Za-z_$][\w$]*$/.test(component.export)) throw Error(`${name}: invalid export name.`);
  }
  const locales = config.locales || { [config.language || 'en']: { label: config.language || 'English', path: '' } };
  if (!Object.keys(locales).length) throw Error('At least one locale is required.');
  const prefixes = new Set();
  for (const [key, locale] of Object.entries(locales)) {
    if (!/^[\w-]+$/.test(key) || !locale || typeof locale !== 'object') throw Error('Invalid locale configuration.');
    if(locale.ui && (typeof locale.ui !== 'object' || Object.values(locale.ui).some(value=>typeof value !== 'string'))) throw Error('Locale ui values must be strings.');
    locale.path ??= key;
    if (!/^[\w-]*$/.test(locale.path) || prefixes.has(locale.path)) throw Error('Locale paths must be unique folder names.');
    prefixes.add(locale.path);
  }
  return { file, root, config, source, output, theme, components, publicDir, base, locales };
}
