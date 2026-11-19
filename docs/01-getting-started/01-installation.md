---
title: Installation
description: Create a project and start writing your docs.
---
Use Node.js 20.19 or newer on your computer. The finished site is static, so your host does not need Node.js.

## Create your site

Run the starter, install its dependencies, and start the preview:

:::tabs Package manager
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

Open the address printed in your terminal, usually `http://localhost:8000`. The preview updates when you save your files.

The starter gives you a small project:

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::

Your content and styles live here. miradocs is installed as a dependency.

Use the same package manager for creating the project, installing dependencies, and running scripts. The Yarn example uses Yarn 2 or newer.

## Write your first page

Open `docs/index.md` and replace its contents:

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```

Add more `.md` files to create more pages. See [Writing content](/guides/writing-content/) for links, images, and components, or [Page examples](/guides/page-examples/) for complete files to work from.

## Build your site

:::tabs Package manager
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

The build writes your site to `site/`. The preview serves those files locally. When you are ready to put the site online, follow [Deployment](/guides/deployment/).
