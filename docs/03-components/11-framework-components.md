---
title: Framework components
description: Use React, Vue, Svelte, and browser JavaScript components inside Markdown.
---
## Register a component

Add a `clientComponents` entry to `miradocs.config.json`. Its key becomes a Markdown directive. The source can be a local file or an installed package export.

```json title=miradocs.config.json
{
  "clientComponents": {
    "counter": {
      "src": "./components/Counter.jsx",
      "framework": "react",
      "load": "visible"
    }
  }
}
```

Pass JSON props on the directive's opening line. The body is fallback Markdown for readers before the component loads or when JavaScript is unavailable.

```md title=docs/example.md
---
title: Counter example
---

:::counter {"initial":2}
Interactive counter.
:::
```

## React

Install `react` and `react-dom` in your docs project. Use `framework: "react"` for a React 18 or newer component. JSX and TSX are compiled during the build.

:::react-counter {"initial":2}
Interactive React counter.
:::

```jsx title=components/Counter.jsx
import {useState} from 'react';
import './counter.css';
export default function Counter({initial=0,label='React counter'}) {
  const [count,setCount]=useState(initial);
  return <div className="framework-counter"><span>{label}</span><button onClick={()=>setCount(count+1)} aria-label={`${label}: ${count}`}>Count: {count}</button></div>;
}
```

The example imports this stylesheet:

```css title=components/counter.css
.framework-counter{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);font:14px var(--font)}.framework-counter button{font:inherit;background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}
```

For React syntax and component authoring, see the [React documentation](https://react.dev/learn).

## Vue

Install `vue` and `@vue/compiler-sfc`. Register a `.vue` file with `framework: "vue"`. Standard scripts, script setup, and scoped styles are supported. Vue CSS modules require a custom module adapter.

:::vue-counter {"initial":3}
Interactive Vue counter.
:::

```html title=components/Counter.vue
<script setup>
import {ref} from 'vue';
const props=defineProps({initial:{type:Number,default:0},label:{type:String,default:'Vue counter'}});
const count=ref(props.initial);
</script>
<template><div class="counter"><span>{{ label }}</span><button @click="count++" :aria-label="`${label}: ${count}`">Count: {{ count }}</button></div></template>
<style scoped>
.counter{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);font:14px var(--font)}button{font:inherit;background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}
</style>
```

See [Vue single-file components](https://vuejs.org/guide/scaling-up/sfc.html) for the format.

## Svelte

Install `svelte` and register a Svelte 5 `.svelte` file with `framework: "svelte"`.

:::svelte-counter {"initial":4}
Interactive Svelte counter.
:::

```svelte title=components/Counter.svelte
<script>
let {initial=0,label='Svelte counter'}=$props();
let count=$state(initial);
</script>
<div class="counter"><span>{label}</span><button onclick={()=>count++} aria-label={`${label}: ${count}`}>Count: {count}</button></div>
<style>
.counter{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);font:14px var(--font)}button{font:inherit;background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}
</style>
```

See the [Svelte tutorial](https://svelte.dev/tutorial) for Svelte component syntax.

## Other libraries and web components

Use `framework: "module"` with a browser module that exports `mount(element, props, context)`. Return a function that removes the component and releases its resources. `context.signal` is aborted when the page is left.

:::web-counter {"initial":1}
Interactive custom element.
:::

```js title=components/CounterElement.js
class ExampleCounter extends HTMLElement {
  connectedCallback(){
    if(this.shadowRoot)return;
    let count=Number(this.getAttribute('initial') || 0);
    const root=this.attachShadow({mode:'open'});
    root.innerHTML='<style>:host{display:block}button{font:14px var(--font);background:var(--accent);color:var(--accent-text);border:0;border-radius:var(--radius);padding:10px 16px;cursor:pointer;min-height:44px}</style><button></button>';
    const button=root.querySelector('button');const render=()=>button.textContent=`Web component: ${count}`;
    button.addEventListener('click',()=>{count++;render();});render();
  }
}
if(!customElements.get('example-counter'))customElements.define('example-counter',ExampleCounter);
export function mount(element,{initial=0}){
  const counter=document.createElement('example-counter');counter.setAttribute('initial',String(initial));element.replaceChildren(counter);return()=>counter.remove();
}
```

For a third-party library, the adapter follows the same contract:

```js title=components/widget.js
import { createWidget } from 'your-component-library';

export function mount(element, props, { signal }) {
  const widget = createWidget(element, props);
  return () => widget.destroy();
}
```

This adapter works with libraries that provide a browser mounting API. For a framework requiring another compiler, import its compiled JavaScript output from the adapter.

## Loading and lifecycle

| Setting | When the component loads |
| --- | --- |
| `visible` | Near the viewport; the default |
| `idle` | When the browser has idle time |
| `eager` | When the page initializes |

Framework code is bundled into static assets. Each page loads only the components it uses. React roots, Vue apps, Svelte instances, and module cleanup functions are disposed before client navigation replaces the page. Component styles are included on the pages that use them.

Props must be a JSON object. Set `export` in the component configuration to use a named export instead of the default export. The directive body is fallback content; it is not automatically passed as a framework slot or children prop.
