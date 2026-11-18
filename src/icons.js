import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import * as brands from 'simple-icons';
import { escape, localUrl, safeUrl } from './utils.js';

const lucide = path.dirname(createRequire(import.meta.url).resolve('lucide-static/package.json'));
const cache = new Map();
export async function icon(name = 'book-open', base = '/') {
  if (name.startsWith('custom:')) return `<img src="${escape(localUrl(base, safeUrl(name.slice(7))))}" alt="">`;
  if (cache.has(name)) return cache.get(name);
  const brand = Object.values(brands).find(item => item && typeof item === 'object' && item.slug === name);
  let svg;
  if (brand) svg = brand.svg.replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
  else {
    if (!/^[a-z0-9-]+$/.test(name)) throw Error(`Invalid icon: ${name}`);
    try { svg = (await fs.readFile(path.join(lucide, 'icons', `${name}.svg`), 'utf8')).replace('<svg ', '<svg aria-hidden="true" focusable="false" '); }
    catch { throw Error(`Unknown icon: ${name}. Use a Lucide name, Simple Icons slug, or custom:/file.svg.`); }
  }
  cache.set(name, svg); return svg;
}
