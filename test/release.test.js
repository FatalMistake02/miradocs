import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseReleaseTag, setReleaseVersion} from '../scripts/release-version.js';
import {publishRelease} from '../scripts/publish-release.js';

test('release tags select stable or preview channels and reject invalid versions', () => {
  assert.deepEqual(parseReleaseTag('v1.2.3'), {version: '1.2.3', distTag: 'latest', prerelease: false});
  assert.deepEqual(parseReleaseTag('v2.0.0-beta.1'), {version: '2.0.0-beta.1', distTag: 'next', prerelease: true});
  for (const tag of ['main', '1.0.0', 'v01.0.0', 'v1.0', 'v1.0.0-01', 'v1.0.0+build', 'v1.0.0\necho bad']) {
    assert.throws(() => parseReleaseTag(tag), /version tag/);
  }
});

test('tag preparation synchronizes both package versions and the lockfile', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'miradocs-release-'));
  t.after(() => fs.rm(root, {recursive: true, force: true}));
  await fs.mkdir(path.join(root, 'packages/create-miradocs'), {recursive: true});
  const fixtures = {
    'package.json': {name: 'miradocs', version: '1.0.0'},
    'packages/create-miradocs/package.json': {name: 'create-miradocs', version: '1.0.0'},
    'package-lock.json': {version: '1.0.0', packages: {'': {version: '1.0.0'}, 'node_modules/example': {version: '3.0.0'}}}
  };
  for (const [file, value] of Object.entries(fixtures)) await fs.writeFile(path.join(root, file), JSON.stringify(value));
  await setReleaseVersion('v1.4.0-beta.2', root);
  for (const file of Object.keys(fixtures)) assert.equal(JSON.parse(await fs.readFile(path.join(root, file), 'utf8')).version, '1.4.0-beta.2');
  const lock = JSON.parse(await fs.readFile(path.join(root, 'package-lock.json'), 'utf8'));
  assert.equal(lock.packages[''].version, '1.4.0-beta.2');
  assert.equal(lock.packages['node_modules/example'].version, '3.0.0');
});

test('packed creator defaults to its own release version', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'miradocs-creator-version-'));
  t.after(() => fs.rm(root, {recursive: true, force: true}));
  await fs.mkdir(path.join(root, 'lib'));
  await fs.writeFile(path.join(root, 'package.json'), JSON.stringify({version: '2.1.0-beta.1', type: 'module'}));
  await fs.copyFile(new URL('../src/starter.js', import.meta.url), path.join(root, 'lib/starter.js'));
  const {pathToFileURL} = await import('node:url');
  const {createStarter} = await import(pathToFileURL(path.join(root, 'lib/starter.js')).href);
  const project = path.join(root, 'my-docs');
  await createStarter(project);
  const pkg = JSON.parse(await fs.readFile(path.join(project, 'package.json'), 'utf8'));
  assert.equal(pkg.devDependencies.miradocs, '2.1.0-beta.1');
});

const archives = [
  {name: 'miradocs', version: '1.2.3', file: '/core.tgz', integrity: 'sha512-core'},
  {name: 'create-miradocs', version: '1.2.3', file: '/creator.tgz', integrity: 'sha512-creator'}
];
const missing = {code: 1, stdout: JSON.stringify({error: {code: 'E404'}})};

test('release reruns resume only missing packages after comparing published integrity', async () => {
  const calls = [];
  await publishRelease(archives, 'latest', async args => {
    calls.push(args);
    if (args[0] === 'view') return args[1].startsWith('miradocs@') ? {code: 0, stdout: JSON.stringify('sha512-core')} : missing;
    return {code: 0, stdout: 'Published'};
  }, () => {});
  assert.deepEqual(calls.filter(args => args[0] === 'publish'), [['publish', '/creator.tgz', '--access', 'public', '--tag', 'latest']]);
});

test('release preflight rejects different contents or registry errors before publishing', async () => {
  for (const response of [{code: 0, stdout: JSON.stringify('sha512-other')}, {code: 1, stderr: 'Authentication failed'}]) {
    const calls = [];
    await assert.rejects(publishRelease(archives, 'latest', async args => {calls.push(args); return args[1].startsWith('miradocs@') ? missing : response;}, () => {}));
    assert.equal(calls.filter(args => args[0] === 'publish').length, 0);
  }
});

test('new release publishes the framework before the creator to the selected channel', async () => {
  const published = [];
  await publishRelease(archives, 'next', async args => {
    if (args[0] === 'view') return missing;
    published.push(args);
    return {code: 0};
  }, () => {});
  assert.deepEqual(published.map(args => [args[1], args.at(-1)]), [['/core.tgz', 'next'], ['/creator.tgz', 'next']]);
});
