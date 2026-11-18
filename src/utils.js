import fs from 'node:fs/promises';
import path from 'node:path';

export const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
export const exists = file => fs.access(file).then(() => true, () => false);
export const inside = (parent, child) => child === parent || child.startsWith(parent + path.sep);
export const clean = value => value.replace(/^\d+[-_ ]*/, '');
export const label = value => clean(value).replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
export const slug = value => value.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-') || 'section';
export function localUrl(base, value) { return /^(https?:|mailto:|tel:|#)/i.test(value) ? value : base + value.replace(/^\//, ''); }
export function safeUrl(value, name = 'URL') {
  if (typeof value !== 'string' || /[\x00-\x20]/.test(value) || /^(?!https?:|mailto:|tel:)[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//')) throw Error(`Invalid ${name}: ${value}`);
  return value;
}
export async function walk(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) throw Error(`Symbolic links are not supported in source directories: ${file}`);
    if (entry.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
}
