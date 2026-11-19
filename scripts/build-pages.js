import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {build} from '../src/index.js';

const configFile = new URL('../.miradocs-pages.config.json', import.meta.url);
const address = new URL(process.argv[2] || 'https://fatalmistake02.github.io/miradocs/');
if (address.protocol !== 'https:' || address.username || address.password || address.search || address.hash) {
  throw Error('The Pages address must be an HTTPS URL without credentials, a query, or a fragment.');
}
const config = JSON.parse(await fs.readFile(new URL('../miradocs.config.json', import.meta.url), 'utf8'));
config.site = address.origin;
config.base = address.pathname;
try {
  await fs.writeFile(configFile, JSON.stringify(config));
  await build(fileURLToPath(configFile));
} finally {
  await fs.rm(configFile, {force:true});
}
