import { createStarter } from './starter.js';
export async function init(directory='.') {
  const result=await createStarter(directory);
  console.log(`Created documentation in ${result.root}.\nNext: install dependencies, then run npm run dev.`);
}
