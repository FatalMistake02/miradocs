---
title: Quick start
description: Create a project, preview your pages, and produce a static build.
---
## Requirements

Use Node.js 20.19 or newer. Install dependencies with npm, pnpm, yarn, or Bun. The built site needs no Node.js runtime.

## Run this repository

```sh
npm ci
npm run dev
```

Open [localhost:8000](http://localhost:8000). Content, theme, component, and configuration changes rebuild and reload the preview automatically. Errors appear in the terminal and browser while the previous build stays available.

## Create another site

From this repository, run:

```sh
node bin/miradocs.js init ../my-docs
node bin/miradocs.js dev --config ../my-docs/miradocs.config.json
```

The initializer creates content, configuration, and a theme. It refuses to overwrite existing files. You can also install the package from a local directory or a generated tarball, then use the installed `miradocs` command. This repository has not been published to the npm registry.

## Build

```sh
npm run build
```

The output is written to `site/`. Run `node bin/miradocs.js serve` for a preview without file watching. Both preview commands accept `--port 3000`. All commands accept `--config` except init.
