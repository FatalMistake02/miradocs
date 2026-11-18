import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { watch } from 'chokidar';
import { build } from './index.js';
import { exists, inside } from './utils.js';

const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.woff2':'font/woff2', '.ico':'image/x-icon', '.xml':'application/xml', '.txt':'text/plain' };
export async function serve(configPath, port = 8000, { watchFiles = true } = {}) {
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw Error('port must be between 0 and 65535.');
  let ctx = await build(configPath, { dev: watchFiles, drafts: watchFiles });
  const clients = new Set();
  const broadcast = value => { for (const client of clients) client.write(`data: ${JSON.stringify(value)}\n\n`); };
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const endpoint = ctx.base + '__miradocs/';
    if (url.pathname === endpoint + 'events' && watchFiles) {
      res.writeHead(200, { 'content-type':'text/event-stream', 'cache-control':'no-cache', connection:'keep-alive' });
      res.write(': connected\n\n'); clients.add(res); req.on('close', () => clients.delete(res)); return;
    }
    if (url.pathname === endpoint + 'client.js' && watchFiles) {
      res.writeHead(200, { 'content-type': mime['.js'] });
      res.end(`new EventSource(${JSON.stringify(endpoint+'events')}).onmessage=e=>{const m=JSON.parse(e.data);if(m.type==='reload')location.reload();else{let box=document.getElementById('miradocs-error');if(!box){box=document.createElement('pre');box.id='miradocs-error';box.style.cssText='position:fixed;bottom:16px;left:16px;right:16px;z-index:100;background:#351a1a;color:#ffd9d9;padding:24px;border:1px solid #854040;border-radius:12px;white-space:pre-wrap';document.body.append(box)}box.textContent='Build failed: '+m.message}};`); return;
    }
    try {
      if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
      const pathname = decodeURIComponent(url.pathname);
      if (!pathname.startsWith(ctx.base) || pathname.includes('\0') || pathname.includes('\\')) throw Error();
      let file = path.resolve(ctx.output, '.' + path.sep + pathname.slice(ctx.base.length));
      if (!inside(ctx.output, file) || path.basename(file).startsWith('.')) throw Error();
      let stat = await fs.stat(file);
      if (stat.isDirectory()) {
        if (!pathname.endsWith('/')) { res.writeHead(308, {location:url.pathname+'/'+url.search}).end(); return; }
        file = path.join(file,'index.html');
      }
      const body = await fs.readFile(file);
      res.writeHead(200, { 'content-type':mime[path.extname(file)] || 'application/octet-stream', 'cache-control':'no-cache', 'x-content-type-options':'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch {
      const body = await fs.readFile(path.join(ctx.output,'404.html')).catch(()=>Buffer.from('Not found'));
      res.writeHead(404, {'content-type':mime['.html']}); res.end(body);
    }
  });
  await new Promise((resolve,reject)=>{ server.once('error',reject); server.listen(port,'127.0.0.1',resolve); });
  let watcher, timer, building = false, pending = false;
  const rebuild = async () => {
    if (building) { pending = true; return; }
    building = true;
    try { ctx = await build(configPath,{dev:true,drafts:true}); watcher?.add([ctx.file,ctx.source,ctx.theme,ctx.components,ctx.publicDir]); broadcast({type:'reload'}); }
    catch(error) { console.error(error.message); broadcast({type:'error',message:error.message}); }
    finally { building = false; if(pending){pending=false;await rebuild();} }
  };
  if(watchFiles) {
    watcher = watch([ctx.file, ctx.source, ctx.theme, ctx.components, ctx.publicDir, fileURLToPath(new URL('../assets/',import.meta.url))],{ignoreInitial:true,awaitWriteFinish:{stabilityThreshold:100,pollInterval:30}});
    watcher.on('all',()=>{clearTimeout(timer);timer=setTimeout(rebuild,100);});
    await new Promise(resolve=>watcher.once('ready',resolve));
  }
  const address = server.address(); console.log(`Preview: http://localhost:${address.port}${ctx.base}${watchFiles?' · watching for changes':''}`);
  return { server, url:`http://localhost:${address.port}${ctx.base}`, close:async()=>{clearTimeout(timer);await watcher?.close();for(const client of clients) client.end();await new Promise(resolve=>server.close(resolve));} };
}
