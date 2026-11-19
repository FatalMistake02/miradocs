---
title: Exemplos de páginas
description: Copie estes arquivos completos para criar um site pequeno.
---
Os exemplos incluem uma página inicial, um guia de instalação e uma referência de configuração. Salve cada arquivo no caminho indicado, preserve os links entre eles e substitua o conteúdo de exemplo pelo seu. Os prefixos numéricos organizam a navegação. Escolha seu gerenciador de pacotes nas abas.

## Página inicial

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


## Página de guia

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


## Página de referência

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


## Exemplos

```sh
node bin/miradocs.js dev --config examples/basic/miradocs.config.json --port 8001
```
