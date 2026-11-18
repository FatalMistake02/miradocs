import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const number = '(?:0|[1-9][0-9]*)';
const identifier = '(?:0|[1-9][0-9]*|[0-9A-Za-z-]*[A-Za-z-][0-9A-Za-z-]*)';
const releasePattern = new RegExp(`^v(${number}\\.${number}\\.${number}(?:-${identifier}(?:\\.${identifier})*)?)$`);

export function parseReleaseTag(tag) {
  const match = typeof tag === 'string' && tag.match(releasePattern);
  if (!match) throw Error('Use a version tag such as v1.0.0 or v1.1.0-beta.1.');
  const version = match[1];
  return {version, distTag: version.includes('-') ? 'next' : 'latest', prerelease: version.includes('-')};
}

export async function setReleaseVersion(tag, root = repositoryRoot) {
  const release = parseReleaseTag(tag);
  for (const file of ['package.json', 'packages/create-miradocs/package.json', 'package-lock.json']) {
    const target = path.join(root, file);
    const data = JSON.parse(await fs.readFile(target, 'utf8'));
    data.version = release.version;
    if (file === 'package-lock.json') data.packages[''].version = release.version;
    await fs.writeFile(target, JSON.stringify(data, null, 2) + '\n');
  }
  return release;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    let tag = process.argv[2];
    if (tag === '--current') {
      const pkg = JSON.parse(await fs.readFile(path.join(repositoryRoot, 'package.json'), 'utf8'));
      tag = 'v' + pkg.version;
    }
    const release = await setReleaseVersion(tag);
    if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT,
      `version=${release.version}\ndist-tag=${release.distTag}\nprerelease=${release.prerelease}\n`);
    console.log(`Preparing miradocs and create-miradocs ${release.version} (${release.distTag}).`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
