import fs from 'node:fs/promises';
import path from 'node:path';
import { exists } from './utils.js';

export async function init(directory = '.') {
  const root = path.resolve(directory);
  const files = {
    'miradocs.config.json': JSON.stringify({ title:'Documentation',content:'docs',output:'site',theme:'theme',styles:['tokens.css'],links:[] },null,2)+'\n',
    'docs/index.md': '---\ntitle: Documentation\ndescription: Guides and reference for your project.\nlayout: landing\nsidebar: false\n---\n:::button Get started | /getting-started/\n:::\n\n:::cards\n:::card Getting started | /getting-started/\nInstall and configure your project.\n:::\n:::card Reference | /reference/\nExplore the available options.\n:::\n:::\n',
    'docs/01-getting-started.md': '---\ntitle: Getting started\ndescription: Install and configure the project.\n---\n## Installation\n\nAdd your instructions here.\n\n:::note\nEdit this file in your docs folder.\n:::\n',
    'docs/02-reference.md': '---\ntitle: Reference\ndescription: Project options and configuration.\n---\n## Options\n\n| Option | Description |\n| --- | --- |\n| Example | Replace with your own options. |\n',
    'theme/tokens.css': '/* Override semantic tokens. Layout is shared by both palettes. */\n:root { --radius: 8px; }\nhtml[data-theme="dark"] { /* --accent: ...; */ }\n',
  };
  for (const file of Object.keys(files)) if (await exists(path.join(root,file))) throw Error(`init would overwrite ${file}. Choose an empty destination.`);
  for (const [file,content] of Object.entries(files)) { await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true}); await fs.writeFile(path.join(root,file),content); }
  console.log(`Created documentation in ${root}. Run miradocs dev --config ${path.join(directory,'miradocs.config.json')}`);
}
