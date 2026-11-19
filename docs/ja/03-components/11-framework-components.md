---
title: フレームワークのコンポーネント
description: React、Vue、Svelte、ブラウザーモジュールを clientComponents に登録します。
---
`src` と `framework`、必要に応じて `load` や `export` を指定します。Markdown でディレクティブを使い、`{ initial: 2 }` のようなオブジェクトで props を渡します。本文は読み込み前の代替表示で、slot としては渡されません。必要な依存関係をインストールしてください。例では React 18 以降、Vue とコンパイラー、または Svelte 5 を使用します。スタイルは使用するページで読み込まれます。モジュールは `mount` を公開し、後処理の関数を返せます。ページ移動時に各インスタンスが破棄されます。

## コンポーネントの登録

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

:::tabs パッケージマネージャー
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

:::tabs パッケージマネージャー
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

:::tabs パッケージマネージャー
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


## カスタマイズ

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


## ブラウザーモジュール

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
