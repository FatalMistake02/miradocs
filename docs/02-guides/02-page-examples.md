---
title: Page examples
description: Copy complete Markdown files for a small documentation site.
---
These three files work together as a small site. Copy them into your project's `docs/` folder, then replace the sample text and commands with your own.

## Landing page

Save this as `docs/index.md`. Its links point to the guide and reference page below.

````md title=docs/index.md
---
title: Project documentation
description: Setup instructions and configuration reference.
layout: landing
sidebar: false
---

Use these pages to install and configure the project.

:::button Installation | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Requirements, install commands, and a local preview.
:::
:::card Configuration | /reference/configuration/
Project settings and an example configuration file.
:::
:::
````

## Guide page

Save this as `docs/01-guides/01-installation.md`. The folder creates a Guides sidebar group; numbered prefixes set the default order.

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install dependencies and run the project locally.
---

## Requirements

- Node.js 20.19 or later
- A copy of the project repository

## Install

Run these commands from the project root:

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

:::note Deployment
Run the `build` script when you are ready to generate static files.
:::

## Configure the site

Continue with [Configuration](../02-reference/01-configuration.md).
````

## Reference page

Save this as `docs/02-reference/01-configuration.md`.

````md title=docs/02-reference/01-configuration.md
---
title: Configuration
description: Settings for the documentation site.
---

## Settings

| Setting | Purpose | Default |
| --- | --- | --- |
| `title` | Name in the header | Documentation |
| `content` | Markdown directory | docs |
| `output` | Generated site directory | site |

## Example

```json title=miradocs.config.json
{
  "title": "Project documentation",
  "content": "docs",
  "output": "site"
}
```

:::details Where do paths resolve?
Configured file paths resolve relative to the configuration file.
:::

[Return to installation](../01-guides/01-installation.md)
````

## Preview the example site

These files are also included in the repository under `examples/basic/docs/`. From a repository checkout, preview them with:

```sh
node bin/miradocs.js dev --config examples/basic/miradocs.config.json --port 8001
```

Open [localhost:8001](http://localhost:8001). Update links when renaming files in your own copy.
