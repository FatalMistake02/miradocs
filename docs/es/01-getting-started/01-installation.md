---
title: Instalación
description: Crea tu sitio y empieza a escribir.
---
Necesitas Node.js 20.19 o posterior; el sitio generado es estático y el servidor no necesita Node.js. Elige tu gestor de paquetes, crea el proyecto, instala las dependencias y ejecuta `dev`. La vista previa se actualiza al guardar. Escribe en `docs/`, personaliza `theme/` y ejecuta `build` para generar `site/`. Los paquetes todavía no se han publicado: hasta el primer lanzamiento, utiliza el paquete local que se muestra abajo.

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

:::note Antes del primer lanzamiento
Los paquetes npm todavía no se han publicado. Utiliza el paquete local hasta que estén disponibles.
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


## Usar un paquete local

```sh
npm ci
npm pack
node packages/create-miradocs/build.js
```

```sh
node packages/create-miradocs/bin/create-miradocs.js ../my-docs --miradocs-version file:/absolute/path/to/miradocs-1.0.0.tgz
cd ../my-docs
```

:::tabs Gestor de paquetes
:::tab npm
```sh
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun install
bun run dev
```
:::
:::
