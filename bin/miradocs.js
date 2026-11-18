#!/usr/bin/env node
import { build, serve } from '../src/index.js';
const [command = 'build', ...args] = process.argv.slice(2);
const option = (name, fallback) => { const i = args.indexOf(name); return i < 0 ? fallback : args[i + 1]; };
try {
  const config = option('--config', 'miradocs.config.json');
  if (command === 'build') await build(config);
  else if (command === 'dev' || command === 'serve') await serve(config, Number(option('--port', '8000')));
  else if (command === '--help' || command === 'help') console.log('miradocs build|dev [--config path] [--port 8000]');
  else throw new Error(`Unknown command: ${command}`);
} catch (error) { console.error(`miradocs: ${error.message}`); process.exitCode = 1; }
