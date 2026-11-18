---
title: Page examples
description: Complete Markdown files for a landing page, guide, and reference page.
---
## Run the example site

The repository includes these files in `examples/basic/`. To preview them, run this from the repository root:

```sh
node bin/miradocs.js dev --config examples/basic/miradocs.config.json --port 8001
```

Open [localhost:8001](http://localhost:8001). To use the files in your own site, copy `examples/basic/docs/` into your configured content directory and replace the sample text.

## Landing page

Save as `docs/index.md`. The landing layout omits the documentation sidebars. The links below match the guide and reference files shown later on this page.

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

Save as `docs/01-guides/01-installation.md`. The numbered folder creates a Guides group and the numbered filename controls its order.

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

```sh
npm ci
npm run dev
```

:::note Deployment
Use `npm run build` when you are ready to generate static files.
:::

## Configure the site

Continue with the [configuration reference](../02-reference/01-configuration.md).
````

## Reference page

Save as `docs/02-reference/01-configuration.md`. This example combines a table, a JSON code block, and an optional disclosure.

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

## Adapt the examples

Change the frontmatter titles and descriptions, replace the commands and prose, and update any links when renaming files. Keep component directives outside code fences to render them. Put them inside code fences when documenting the syntax itself.
