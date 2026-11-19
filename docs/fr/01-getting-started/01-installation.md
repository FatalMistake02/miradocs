---
title: Installation
description: Créez votre site et commencez à écrire.
---
Utilisez Node.js 20.19 ou une version ultérieure ; le site généré est statique et l’hébergement ne nécessite pas Node.js. Choisissez votre gestionnaire de paquets, créez le projet, installez les dépendances et lancez `dev`. L’aperçu se met à jour à chaque enregistrement. Écrivez dans `docs/`, personnalisez `theme/` et lancez `build` pour générer `site/`. Les paquets ne sont pas encore publiés : utilisez le paquet local présenté ci-dessous en attendant la première version.

## Créer le site

:::tabs Gestionnaire de paquets
:::tab npm
```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm create miradocs@latest my-docs
cd my-docs
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn dlx create-miradocs@latest my-docs
cd my-docs
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun create miradocs@latest my-docs
cd my-docs
bun install
bun run dev
```
:::
:::

:::note Avant la première publication
Les paquets npm ne sont pas encore publiés. Utilisez le paquet local en attendant leur disponibilité.
:::

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::


## Rédiger la première page

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```


## Générer le site

:::tabs Gestionnaire de paquets
:::tab npm
```sh
npm run build
npm run preview
```
:::
:::tab pnpm
```sh
pnpm run build
pnpm run preview
```
:::
:::tab Yarn
```sh
yarn run build
yarn run preview
```
:::
:::tab Bun
```sh
bun run build
bun run preview
```
:::
:::


## Utiliser un paquet local

```sh
npm ci
npm pack
node packages/create-miradocs/build.js
```

```sh
node packages/create-miradocs/bin/create-miradocs.js ../my-docs --miradocs-version file:/absolute/path/to/miradocs-1.0.0.tgz
cd ../my-docs
```

:::tabs Gestionnaire de paquets
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
