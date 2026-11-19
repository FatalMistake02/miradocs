---
title: Rédiger du contenu
description: Créez des pages en Markdown avec des métadonnées YAML.
---
Définissez `title` et éventuellement `description` en début de fichier, puis commencez le corps avec `##` puisque le titre est déjà affiché. Utilisez `###` pour les sous-sections. Ajoutez des liens, images, tableaux, tâches, notes de bas de page et composants. Les liens vers des fichiers `.md` deviennent des URL. Placez images et téléchargements dans `public/`. La génération détecte les pages, fichiers et fragments internes manquants. Consultez le [tutoriel CommonMark](https://commonmark.org/help/tutorial/) pour apprendre la syntaxe.

## Créer une page

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

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

:::note Production build
Run the `build` script to generate the finished site.
:::
````


## Ajouter des liens et images

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```


## Ajouter des composants

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::
