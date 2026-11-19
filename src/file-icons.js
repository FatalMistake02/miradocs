import * as icons from 'simple-icons';

const extensions = {
  js:'Javascript',mjs:'Javascript',cjs:'Javascript',ts:'Typescript',mts:'Typescript',cts:'Typescript',
  jsx:'React',tsx:'React',vue:'Vuedotjs',svelte:'Svelte',astro:'Astro',html:'Html5',htm:'Html5',
  css:'Css',scss:'Sass',sass:'Sass',less:'Less',json:'Json',jsonc:'Json',yaml:'Yaml',yml:'Yaml',
  md:'Markdown',markdown:'Markdown',mdx:'Mdx',py:'Python',pyi:'Python',rs:'Rust',go:'Go',
  sh:'Gnubash',bash:'Gnubash',c:'C',h:'C',cpp:'Cplusplus',hpp:'Cplusplus',cc:'Cplusplus',
  cs:'Dotnet',fs:'Dotnet',php:'Php',rb:'Ruby',swift:'Swift',kt:'Kotlin',kts:'Kotlin',
  dart:'Dart',lua:'Lua',r:'R',toml:'Toml',graphql:'Graphql',gql:'Graphql',sql:'Postgresql',
  sqlite:'Sqlite',wasm:'Webassembly'
};
const filenames = {
  'package.json':'Npm','package-lock.json':'Npm','npm-shrinkwrap.json':'Npm','.npmrc':'Npm',
  'pnpm-lock.yaml':'Pnpm','pnpm-workspace.yaml':'Pnpm','yarn.lock':'Yarn','.yarnrc.yml':'Yarn',
  'bun.lock':'Bun','bun.lockb':'Bun','dockerfile':'Docker','.dockerignore':'Docker',
  'compose.yaml':'Docker','compose.yml':'Docker','docker-compose.yml':'Docker','docker-compose.yaml':'Docker',
  '.gitignore':'Git','.gitattributes':'Git','.gitmodules':'Git','.editorconfig':'Editorconfig',
  'cargo.toml':'Rust','cargo.lock':'Rust','go.mod':'Go','go.sum':'Go',
  'pyproject.toml':'Python','requirements.txt':'Python','pipfile':'Python'
};
const cache = new Map();

export function fileTypeIcon(filename) {
  const name = filename.toLowerCase();
  if (/^miradocs\.config\.jsonc?$/.test(name)) return {type:'miradocs-config',lucide:'file-cog',color:'var(--tree-icon)'};
  let type = Object.hasOwn(filenames,name) ? filenames[name] : null;
  if (!type) {
    if (/^\.env(?:\.|$)/.test(name)) type = 'Dotenv';
    else if (/^tsconfig(?:\..+)?\.json$/.test(name)) type = 'Typescript';
    else if (/^vite\.config\./.test(name)) type = 'Vite';
    else if (/^vitest\.config\./.test(name)) type = 'Vitest';
    else if (/^(?:eslint\.config\.|\.eslintrc)/.test(name)) type = 'Eslint';
    else if (/^(?:prettier\.config\.|\.prettierrc|\.prettierignore$)/.test(name)) type = 'Prettier';
    else { const extension=name.split('.').at(-1);type=Object.hasOwn(extensions,extension) ? extensions[extension] : null; }
  }
  if (!type) return null;
  if (!cache.has(type)) {
    const icon = icons['si' + type];
    const neutral = ['Json','Markdown','Mdx','Rust','Bun','Editorconfig'].includes(type);
    cache.set(type, {
      type: icon.slug,
      color: neutral ? 'var(--text)' : '#' + icon.hex,
      svg: icon.svg.replace(/<title>.*?<\/title>/, '').replace('<svg ', '<svg class="file-type-icon" aria-hidden="true" focusable="false" fill="currentColor" ')
    });
  }
  return cache.get(type);
}
