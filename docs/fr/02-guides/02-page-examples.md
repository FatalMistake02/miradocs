---
title: Exemples de pages
description: Copiez ces fichiers complets pour créer un petit site.
---
Ils comprennent une page d’accueil, un guide d’installation et une référence de configuration. Enregistrez chaque fichier à l’emplacement indiqué, conservez les liens entre les pages et remplacez le contenu d’exemple. Les préfixes numériques organisent la navigation. Les onglets permettent de choisir votre gestionnaire de paquets.

## Page d’accueil

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


## Page de guide

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


## Page de référence

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


## Exemples

```sh
node bin/miradocs.js dev --config examples/basic/miradocs.config.json --port 8001
```
