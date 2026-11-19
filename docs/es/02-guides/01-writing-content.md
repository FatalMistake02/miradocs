---
title: Escribir contenido
description: Crea páginas con Markdown y metadatos YAML.
---
Define `title` y, si quieres, `description` al principio del archivo; empieza el cuerpo con `##` porque el título ya se muestra. Utiliza `###` para subsecciones. Puedes añadir enlaces, imágenes, tablas, tareas, notas al pie y componentes. Los enlaces a archivos `.md` se convierten en URL. Guarda imágenes y descargas en `public/`. La compilación detecta páginas, archivos y fragmentos internos que no existen. Aprende la sintaxis con el [tutorial de CommonMark](https://commonmark.org/help/tutorial/).

## Crear una página

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

:::tabs Package manager
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

:::note Production build
Run the `build` script to generate the finished site.
:::
````


## Añadir enlaces e imágenes

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```


## Añadir componentes

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::
