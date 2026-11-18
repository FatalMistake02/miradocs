#!/usr/bin/env node
import {parseArgs} from 'node:util';
import {createInterface} from 'node:readline/promises';
import {spawn} from 'node:child_process';
import {createStarter} from '../lib/starter.js';

try {
  const {values,positionals}=parseArgs({allowPositionals:true,options:{help:{type:'boolean',short:'h'},install:{type:'boolean'},title:{type:'string'},'miradocs-version':{type:'string'}}});
  if(values.help){console.log('npm create miradocs@latest [directory] [-- --install]\nOptions: --title "Project docs"');}
  else {
    if(positionals.length>1)throw Error('Provide one project directory.');
    let directory=positionals[0];
    if(!directory && process.stdin.isTTY){const input=createInterface({input:process.stdin,output:process.stdout});directory=(await input.question('Project directory (my-docs): ')).trim() || 'my-docs';input.close();}
    const result=await createStarter(directory || 'my-docs',{version:values['miradocs-version'] || '^1.0.0',title:values.title || 'Documentation'});
    const agent=process.env.npm_config_user_agent || '';
    const manager=agent.startsWith('pnpm')?'pnpm':agent.startsWith('yarn')?'yarn':agent.startsWith('bun')?'bun':'npm';
    if(values.install)await new Promise((resolve,reject)=>{const child=spawn(manager,['install'],{cwd:result.root,stdio:'inherit',shell:process.platform==='win32'});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(`Dependency installation exited with ${code}. The generated project is still available.`)));});
    console.log(`\nCreated ${result.name}.\n\n  cd ${directory || 'my-docs'}\n${values.install?'':`  ${manager} install\n`}  ${manager} run dev\n`);
  }
}catch(error){console.error(`create-miradocs: ${error.message}`);process.exitCode=1;}
