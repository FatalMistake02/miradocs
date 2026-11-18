#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';
import { build, serve } from '../src/index.js';
import { init } from '../src/init.js';

try {
  const { values, positionals } = parseArgs({ allowPositionals:true, options:{config:{type:'string'},port:{type:'string'},help:{type:'boolean',short:'h'},version:{type:'boolean',short:'v'}} });
  const [command = 'build', directory] = positionals;
  if (values.version) console.log(JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8')).version);
  else if (values.help || command === 'help') console.log('miradocs init [directory]\nmiradocs build|dev|serve [--config path] [--port 8000]\nmiradocs --version');
  else {
    if(positionals.length > (command === 'init' ? 2 : 1)) throw Error('Unexpected positional argument. Run miradocs --help.');
    const config = values.config || 'miradocs.config.json';
    if(command === 'build') await build(config);
    else if(command === 'dev' || command === 'serve') {
      const preview = await serve(config,Number(values.port || '8000'),{watchFiles:command === 'dev'});
      for(const signal of ['SIGINT','SIGTERM']) process.once(signal,async()=>{await preview.close();process.exit(0);});
    }
    else if(command === 'init') await init(directory || '.');
    else throw Error(`Unknown command: ${command}. Run miradocs --help.`);
  }
} catch(error) { console.error(`miradocs: ${error.message}`); process.exitCode = 1; }
