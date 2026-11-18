---
title: Installation
description: Create a documentation project with miradocs as a dependency.
---
## Create a project

The starter package is `create-miradocs`. After registry publication, the standard command is:

```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```

The registry packages have not been published yet. The local-package instructions below work from this repository now.

The generated project contains only your content, configuration, and theme overrides. It does not copy the framework source, this documentation site, demo components, or repository tooling.

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::

## Requirements

Use Node.js 20.19 or newer. The generated site is static and needs no Node.js runtime on the host.

## Use the local starter

From a checkout of the miradocs repository:

```sh
npm ci
node packages/create-miradocs/build.js
node packages/create-miradocs/bin/create-miradocs.js ../my-docs
```

For testing before publication, pack the core with `npm pack`, then generate with `--miradocs-version file:/absolute/path/to/miradocs-1.0.0.tgz`. Installing the generated project's dependencies uses that local package.

## Write your first page

Edit `docs/index.md`. Follow [Writing content](/guides/writing-content/) for a complete Markdown file, or use [Page examples](/guides/page-examples/) for a landing page, guide, and reference page.

## Build and preview

Run these commands inside the generated project:

```sh
npm run dev
npm run build
npm run preview
```

Development mode watches your content, styles, components, and configuration. The build command writes `site/` for deployment. The preview command serves a built preview without watching. See [Deployment](/guides/deployment/) for hosting settings.

## Other package managers

After registry publication, the creator also works with `pnpm create miradocs`, `yarn create miradocs`, and `bun create miradocs`. The generated scripts use the miradocs CLI and do not depend on a particular package manager.
