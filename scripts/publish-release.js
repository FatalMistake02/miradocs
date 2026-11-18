import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));

export async function publishRelease(packages, distTag, npm, log = console.log) {
  if (!['latest', 'next'].includes(distTag)) throw Error('The release channel must be latest or next.');
  const pending = [];
  // Check both versions before publishing either package.
  for (const pkg of packages) {
    const result = await npm(['view', `${pkg.name}@${pkg.version}`, 'dist.integrity', '--json']);
    if (result.code === 0) {
      if (JSON.parse(result.stdout) !== pkg.integrity) throw Error(`${pkg.name}@${pkg.version} already exists with different contents. Use a new version.`);
      log(`${pkg.name}@${pkg.version} already published with matching integrity; skipping.`);
    } else {
      let error;
      try { error = JSON.parse(result.stdout).error; } catch {}
      if (error?.code !== 'E404') throw Error(`Could not check ${pkg.name}: ${result.stderr || result.stdout}`);
      pending.push(pkg);
    }
  }
  for (const pkg of pending) {
    const result = await npm(['publish', pkg.file, '--access', 'public', '--tag', distTag]);
    if (result.code !== 0) throw Error(`Publishing ${pkg.name} failed: ${result.stderr || result.stdout}`);
    log(result.stdout || `${pkg.name}@${pkg.version} published.`);
  }
}

function npm(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [process.env.npm_execpath, ...args], {cwd: root});
    let stdout = '', stderr = '';
    child.stdout.on('data', value => stdout += value);
    child.stderr.on('data', value => stderr += value);
    child.once('error', reject);
    child.once('exit', code => resolve({code, stdout, stderr}));
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [distTag, coreFile, creatorFile] = process.argv.slice(2);
    if (!process.env.npm_execpath || !coreFile || !creatorFile) throw Error('Use npm run release:publish -- latest core.tgz creator.tgz');
    const packages = [];
    for (const [manifest, file] of [['package.json', coreFile], ['packages/create-miradocs/package.json', creatorFile]]) {
      const pkg = JSON.parse(await fs.readFile(path.join(root, manifest), 'utf8'));
      packages.push({name: pkg.name, version: pkg.version, file: path.resolve(file), integrity: 'sha512-' + createHash('sha512').update(await fs.readFile(file)).digest('base64')});
    }
    await publishRelease(packages, distTag, npm);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
