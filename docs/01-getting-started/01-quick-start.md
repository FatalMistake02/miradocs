---
title: Quick start
description: Install dependencies, run the local preview, and build your site.
---
## Requirements

Install Node.js 20 or newer. The project uses JavaScript; the generated site is static and needs no server runtime. You can install the dependencies with npm, pnpm, yarn, or another compatible package manager.

## Preview

```sh
npm install
npm run dev
```

Visit [localhost:8000](http://localhost:8000). The server builds at startup. Restart it after editing content or configuration.

## Build

```sh
npm run build
```

Deploy the contents of `site/` to a static host. You can also run `node bin/miradocs.js build` directly. Use `--config path/to/miradocs.config.json` to select a configuration file and `--port 3000` to select a preview port.

## Add a page

Create a Markdown file in `docs/`. Numeric prefixes set the order and are omitted from URLs. For example `docs/01-guides/02-install.md` becomes `/guides/install/`.
