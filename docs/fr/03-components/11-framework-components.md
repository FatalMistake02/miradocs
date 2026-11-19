---
title: Composants de frameworks
description: >-
  Enregistrez des composants React, Vue, Svelte ou des modules de navigateur
  dans clientComponents.
---
Définissez `src`, `framework` et, si nécessaire, `load` ou `export`. Utilisez leur directive dans Markdown et passez les props avec un objet simple, par exemple `{ initial: 2 }`. Le corps est un contenu de secours, pas un slot. Installez les dépendances du framework choisi ; les exemples nécessitent React 18 ou ultérieur, Vue avec son compilateur, ou Svelte 5. Les styles sont chargés sur les pages concernées. Les modules exportent `mount` et peuvent renvoyer une fonction de nettoyage. Les instances sont supprimées lors de la navigation.

## Enregistrer un composant

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

```md title=docs/example.md
---
title: Counter example
---

:::counter { initial: 2 } {.demo-counter}
Interactive counter.
:::
```


## React

:::tabs Gestionnaire de paquets
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

:::react-counter { initial: 2 }
Interactive React counter.
:::


## Vue

:::tabs Gestionnaire de paquets
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

:::vue-counter { initial: 3 }
Interactive Vue counter.
:::


## Svelte

:::tabs Gestionnaire de paquets
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

:::svelte-counter { initial: 4 }
Interactive Svelte counter.
:::


## Personnaliser

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


## Modules de navigateur

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

:::web-counter { initial: 1 }
Interactive web component.
:::

```js title=components/widget.js
import { createWidget } from 'your-component-library';

export function mount(element, props, { signal }) {
  const widget = createWidget(element, props);
  return () => widget.destroy();
}
```
