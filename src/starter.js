import fs from 'node:fs/promises';
import path from 'node:path';

export async function createStarter(directory, { version='^1.0.0',title='Documentation' } = {}) {
  const root=path.resolve(directory);
  let entries=[];
  try{entries=await fs.readdir(root);}catch(error){if(error.code!=='ENOENT')throw error;}
  if(entries.some(entry=>entry!=='.git'))throw Error('The destination must be empty; refusing to overwrite existing files.');
  const name=path.basename(root).toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/^-+|-+$/g,'') || 'my-docs';
  const files={
    'package.json':JSON.stringify({name,private:true,type:'module',scripts:{dev:'miradocs dev',build:'miradocs build',preview:'miradocs serve'},devDependencies:{miradocs:version}},null,2)+'\n',
    'miradocs.config.json':JSON.stringify({$schema:'./node_modules/miradocs/miradocs.schema.json',title,content:'docs',output:'site',theme:'theme',styles:['tokens.css']},null,2)+'\n',
    'docs/index.md':'---\ntitle: Getting started\ndescription: Documentation for your project.\n---\n\nEdit `docs/index.md` to write your first page. Add Markdown files and folders to organize the rest of your documentation.\n',
    'theme/tokens.css':'/* Override miradocs design tokens here. */\n:root {\n  --radius: 8px;\n}\n',
    '.gitignore':'node_modules/\nsite/\nsite.lock/\nsite.tmp-*/\nsite.previous-*/\n'
  };
  await fs.mkdir(root,{recursive:true});
  for(const [file,contents]of Object.entries(files)) {await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),contents,{flag:'wx'});}
  return {root,name,files:Object.keys(files)};
}
