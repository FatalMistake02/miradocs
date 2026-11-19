---
title: Pestañas
description: Agrupa ejemplos relacionados en paneles.
---
Pon cada `tab` directamente dentro de `tabs`, con su etiqueta y su propio cierre. El primer panel aparece seleccionado. Los paneles admiten Markdown y componentes anidados. Usa las flechas izquierda y derecha para cambiar de pestaña; Inicio y Fin seleccionan la primera y la última. Las clases `.tabs`, `.tab-list` y `.tab-panel` permiten personalizar el conjunto o una instancia.

## Ejemplo

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


## Añadir pestañas

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
