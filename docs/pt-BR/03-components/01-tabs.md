---
title: Abas
description: Agrupe exemplos relacionados em painéis.
---
Cada `tab` deve ficar diretamente dentro de `tabs`, com um rótulo e seu próprio fechamento. O primeiro painel começa selecionado. Os painéis aceitam Markdown e componentes aninhados. Use as setas esquerda e direita para alternar; Home e End selecionam a primeira e a última aba. As classes `.tabs`, `.tab-list` e `.tab-panel` permitem personalizar o grupo ou uma instância.

## Exemplo

:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::


## Adicionar abas

````md
:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::
````


## Personalizar

```css title=theme/components.css
.build-tabs { border-radius: 16px; }
.build-tabs .tab-list { gap: 28px; }
.build-tabs .tab-panel { padding: 12px 24px; }
.build-tabs [role="tab"][aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```
