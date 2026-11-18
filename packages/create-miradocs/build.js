import fs from 'node:fs/promises';
await fs.mkdir(new URL('./lib/',import.meta.url),{recursive:true});
await fs.copyFile(new URL('../../src/starter.js',import.meta.url),new URL('./lib/starter.js',import.meta.url));
await fs.copyFile(new URL('../../LICENSE',import.meta.url),new URL('./LICENSE',import.meta.url));
