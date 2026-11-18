import fs from 'node:fs/promises';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';

const runtime = (await fs.readFile(new URL('../assets/outline.js', import.meta.url), 'utf8')).replace('export function initializeOutline', 'function initializeOutline');
function setup(t) {
  const links = '<a href="#first">First</a><a href="#last">Last</a>';
  const dom = new JSDOM(`<header class="topbar"></header><aside class="toc">${links}</aside><details class="mobile-toc">${links}</details><article class="article"><h2 id="first">First</h2><h3 id="last">Last</h3></article>`, {url: 'https://docs.test/', runScripts: 'outside-only'});
  t.after(() => dom.window.close());
  const w = dom.window, controller = new w.AbortController();
  const frames = new Map(); let id = 0;
  w.requestAnimationFrame = callback => {frames.set(++id, callback); return id;};
  w.cancelAnimationFrame = id => frames.delete(id);
  w.document.querySelector('.topbar').getBoundingClientRect = () => ({bottom: 64});
  w.document.querySelector('#first').getBoundingClientRect = () => ({top: 50});
  w.document.querySelector('#last').getBoundingClientRect = () => ({top: 600});
  w.eval(runtime + '\nwindow.startOutline = initializeOutline;');
  w.startOutline(controller.signal);
  const flush = () => {for (const callback of frames.values()) callback(); frames.clear();};
  t.after(() => controller.abort());
  return {w, controller, flush};
}

test('outline clicks select headings that cannot reach the activation threshold', t => {
  const {w, controller, flush} = setup(t);
  const target = w.document.querySelector('.toc a[href="#last"]');
  target.dispatchEvent(new w.MouseEvent('click', {button: 0}));
  w.dispatchEvent(new w.Event('scroll')); flush();
  assert.equal(target.getAttribute('aria-current'), 'location');
  assert.equal(w.document.querySelector('.mobile-toc a[href="#last"]').getAttribute('aria-current'), 'location');
  assert.equal(w.document.querySelector('.toc a[href="#first"]').classList.contains('active'), false);
  controller.abort();
});

test('manual scrolling resumes heading tracking after a clicked selection', t => {
  const {w, flush} = setup(t);
  w.document.querySelector('.toc a[href="#last"]').dispatchEvent(new w.MouseEvent('click', {button: 0}));
  w.dispatchEvent(new w.WheelEvent('wheel')); flush();
  assert.equal(w.document.querySelector('.toc a[href="#last"]').classList.contains('active'), true);
  w.dispatchEvent(new w.Event('scroll')); flush();
  assert.equal(w.document.querySelector('.toc a[href="#first"]').getAttribute('aria-current'), 'location');
});
