---
title: Framework components
description: Use React, Vue, Svelte, and browser modules in Markdown.
---
Register a component once, then use its directive in any page. miradocs bundles the component during the build and loads it on pages where it is used.

## Register a component

Add an entry to `clientComponents`. Its key becomes the directive name:

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

Use a local source file or an installed package export for `src`. Choose `react`, `vue`, `svelte`, or `module` for `framework`.

### Use it in Markdown

Pass props as a JSON object after the directive name:

```md title=docs/example.md
---
title: Counter example
---

:::counter {"initial":2} {.demo-counter}
Interactive counter.
:::
```

The body is fallback content shown before the component loads or when JavaScript is unavailable. It is not passed as a framework slot or children prop.

## React

Install React and React DOM in your project:

:::tabs Package manager
:::tab npm
```sh
npm install react react-dom
```
:::
:::tab pnpm
```sh
pnpm add react react-dom
```
:::
:::tab Yarn
```sh
yarn add react react-dom
```
:::
:::tab Bun
```sh
bun add react react-dom
```
:::
:::

Use React 18 or newer. The configuration above accepts JSX and TSX files.

```jsx title=components/Counter.jsx
import { useState } from 'react';
import './counter.css';

export default function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="framework-counter">
      <span>React counter</span>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```

:::react-counter {"initial":2}
Interactive React counter.
:::

For component authoring, see the [React documentation](https://react.dev/learn).

## Vue

Install Vue and its component compiler:

:::tabs Package manager
:::tab npm
```sh
npm install vue @vue/compiler-sfc
```
:::
:::tab pnpm
```sh
pnpm add vue @vue/compiler-sfc
```
:::
:::tab Yarn
```sh
yarn add vue @vue/compiler-sfc
```
:::
:::tab Bun
```sh
bun add vue @vue/compiler-sfc
```
:::
:::

In the configuration above, set `framework` to `"vue"` and `src` to `"./components/Counter.vue"`.

```html title=components/Counter.vue
<script setup>
import { ref } from 'vue';
import './counter.css';

const props = defineProps({ initial: { type: Number, default: 0 } });
const count = ref(props.initial);
</script>

<template>
  <div class="framework-counter">
    <span>Vue counter</span>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>
```

:::vue-counter {"initial":3}
Interactive Vue counter.
:::

Standard scripts, `<script setup>`, and scoped styles are supported. Vue CSS modules need a custom module adapter. See the [Vue single-file component guide](https://vuejs.org/guide/scaling-up/sfc.html) for the format.

## Svelte

Install Svelte 5:

:::tabs Package manager
:::tab npm
```sh
npm install svelte
```
:::
:::tab pnpm
```sh
pnpm add svelte
```
:::
:::tab Yarn
```sh
yarn add svelte
```
:::
:::tab Bun
```sh
bun add svelte
```
:::
:::

Set `framework` to `"svelte"` and `src` to `"./components/Counter.svelte"`.

```svelte title=components/Counter.svelte
<script>
  import './counter.css';

  let { initial = 0 } = $props();
  let count = $state(initial);
</script>

<div class="framework-counter">
  <span>Svelte counter</span>
  <button onclick={() => count++}>Count: {count}</button>
</div>
```

:::svelte-counter {"initial":4}
Interactive Svelte counter.
:::

See the [Svelte tutorial](https://svelte.dev/tutorial) for component syntax.

## Customize

The examples above import the same stylesheet. Save this once alongside your components:

```css title=components/counter.css
.framework-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--panel-radius);
  background: var(--surface);
}
.framework-counter button {
  min-height: 44px;
  padding: 10px 16px;
  border: 0;
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--accent-text);
  font: inherit;
  cursor: pointer;
}
```

Use CSS variables to follow the site's theme. An instance class such as `.demo-counter` styles the mount container; props and the component's own styles control its contents. See [Theming](/guides/theming/#component-styles).

## Browser modules

Use `framework: "module"` for a component with its own browser mounting API. The module must export `mount(element, props, context)` and can return a cleanup function.

### Web components

This example mounts a custom element. Register it with `src: "./components/CounterElement.js"`:

```js title=components/CounterElement.js
class ExampleCounter extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    let count = Number(this.getAttribute('initial') || 0);
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        button {
          min-height: 44px;
          padding: 10px 16px;
          border: 0;
          border-radius: var(--radius);
          background: var(--accent);
          color: var(--accent-text);
          font: inherit;
          cursor: pointer;
        }
      </style>
      <button></button>
    `;
    const button = root.querySelector('button');
    const render = () => { button.textContent = `Count: ${count}`; };
    button.addEventListener('click', () => { count++; render(); });
    render();
  }
}

if (!customElements.get('example-counter')) {
  customElements.define('example-counter', ExampleCounter);
}

export function mount(element, { initial = 0 }) {
  const counter = document.createElement('example-counter');
  counter.setAttribute('initial', String(initial));
  element.append(counter);
  return () => counter.remove();
}
```

:::web-counter {"initial":1}
Interactive web component.
:::

### Other libraries

Wrap a library's mount function in the same contract:

```js title=components/widget.js
import { createWidget } from 'your-component-library';

export function mount(element, props, { signal }) {
  const widget = createWidget(element, props);
  return () => widget.destroy();
}
```

For a framework that needs another compiler, import its compiled JavaScript output. Use `context.signal` for work that should be cancelled when the page is left.

## Loading and cleanup

| `load` value | When it loads |
| --- | --- |
| `visible` | Near the viewport; the default |
| `idle` | When the browser has idle time |
| `eager` | When the page initializes |

React roots, Vue apps, Svelte instances, and module cleanup functions are disposed before client navigation replaces the page. Component styles load on pages that use them.

For a named React, Vue, or Svelte export, set `export` to its name in the component configuration. Browser module adapters always export `mount`.
