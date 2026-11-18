---
title: Quick start
description: From a folder of files to your first documentation site, in a few small steps.
---
## What you need

You need Python 3.9 or newer. Mira uses the standard library, so there are no packages to install. Copy this project as a starting point, or keep the `miradocs` folder alongside your own content and configuration.

## Build and preview

Run these commands from the project directory:

:::tabs
:::tab Preview locally
```sh
python -m miradocs serve
```
:::
:::tab Build for production
```sh
python -m miradocs build
```
:::
:::

Open [localhost:8000](http://localhost:8000) to preview. The preview builds once at startup; restart it after editing. The production command writes the complete static site to `site/`.

## Make your first edit

Open `docs/index.md` and change the title, description, or content. Every Markdown file becomes a page. Add another file and Mira will include it in navigation automatically.

```text
docs/
  index.md
  01-getting-started/
    01-quick-start.md
```

Numeric prefixes control ordering and are removed from URLs and navigation labels. The example page appears at `/getting-started/quick-start/`.

:::note Running from another directory
Use `--config path/to/mira.json` to point to a configuration file. All configured paths are resolved relative to that file. Python must be able to find the `miradocs` module.
:::
