---
title: Installation
description: Create a project and start writing your docs.
---
Use Node.js 20.19 or newer on your computer. The finished site is static, so your host does not need Node.js.

## Create your site

Run the starter, install its dependencies, and start the preview:

```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```

:::note Before the first release
The npm packages have not been published yet. Use the [local package setup](#use-a-local-package) below until they are available.
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

### Other package managers

You can also create a project with `pnpm create miradocs`, `yarn create miradocs`, or `bun create miradocs`. Use the same package manager to install dependencies and run the generated scripts.

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

```sh
npm run build
npm run preview
```

The build writes your site to `site/`. The preview serves those files locally. When you are ready to put the site online, follow [Deployment](/guides/deployment/).

## Use a local package

Before the npm release, you can create a site from a checkout of this repository. Install dependencies and pack the framework:

```sh
npm ci
npm pack
node packages/create-miradocs/build.js
```

Generate your project, replacing the package path with the absolute path to the tarball created by `npm pack`:

```sh
node packages/create-miradocs/bin/create-miradocs.js ../my-docs --miradocs-version file:/absolute/path/to/miradocs-1.0.0.tgz
cd ../my-docs
npm install
npm run dev
```
