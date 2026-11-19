---
title: Instalación
description: Crea tu sitio y empieza a escribir.
---
Necesitas Node.js 20.19 o posterior; el sitio generado es estático y el servidor no necesita Node.js. Elige tu gestor de paquetes, crea el proyecto, instala las dependencias y ejecuta `dev`. La vista previa se actualiza al guardar. Escribe en `docs/`, personaliza `theme/` y ejecuta `build` para generar `site/`.

## Crear el sitio

:::tabs Gestor de paquetes
:::tab npm
```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm create miradocs@latest my-docs
cd my-docs
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn dlx create-miradocs@latest my-docs
cd my-docs
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun create miradocs@latest my-docs
cd my-docs
bun install
bun run dev
```
:::
:::

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::


## Escribir la primera página

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```


## Compilar el sitio

:::tabs Gestor de paquetes
:::tab npm
```sh
npm run build
npm run preview
```
:::
:::tab pnpm
```sh
pnpm run build
pnpm run preview
```
:::
:::tab Yarn
```sh
yarn run build
yarn run preview
```
:::
:::tab Bun
```sh
bun run build
bun run preview
```
:::
:::
