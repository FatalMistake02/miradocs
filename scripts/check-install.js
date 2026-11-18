import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';

const [coreArgument, creatorArgument] = process.argv.slice(2);
if (!coreArgument || !creatorArgument || !process.env.npm_execpath) {
  throw Error('Run npm run test:install -- path/to/miradocs.tgz path/to/create-miradocs.tgz');
}
const core = path.resolve(coreArgument), creator = path.resolve(creatorArgument);
await Promise.all([fs.access(core), fs.access(creator)]);
const root = await fs.mkdtemp(path.join(os.tmpdir(), 'miradocs-packed-install-'));

function npm(args, cwd = root) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [process.env.npm_execpath, ...args], {cwd, stdio: 'inherit'});
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolve() : reject(Error(`npm ${args[0]} exited with ${code}.`)));
  });
}

try {
  await npm(['exec', '--yes', '--package', 'file:' + creator, '--', 'create-miradocs', 'my-docs', '--miradocs-version', 'file:' + core]);
  const site = path.join(root, 'my-docs');
  assert.deepEqual((await fs.readdir(site)).sort(), ['.gitignore', 'docs', 'miradocs.config.json', 'package.json', 'theme']);
  await npm(['install', '--no-audit', '--no-fund'], site);
  await npm(['run', 'build'], site);
  const html = await fs.readFile(path.join(site, 'site/index.html'), 'utf8');
  assert.match(html, /Getting started/);
  for (const framework of ['react', 'vue', 'svelte']) {
    await assert.rejects(fs.access(path.join(site, 'node_modules', framework)), {code: 'ENOENT'});
  }
  console.log('Packed creator generated and built a minimal documentation site.');
} finally {
  await fs.rm(root, {recursive: true, force: true});
}
