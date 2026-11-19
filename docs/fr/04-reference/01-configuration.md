---
title: Configuration
description: Configurez le site dans miradocs.config.json.
---
Ce fichier utilise du JSON standard ; la syntaxe simplifiée concerne uniquement les options des composants dans Markdown. Définissez titre, dossiers source et de sortie, styles, liens et langues. Le schéma fourni ajoute aide et validation dans les éditeurs compatibles. Les chemins de `styles` sont relatifs à `theme/`. Les commandes `dev`, `build` et `preview` servent au développement, à la génération et à la vérification. `--config` sélectionne un autre fichier et `--port` change le port. `miradocs:navigate` permet de réinitialiser les scripts après navigation.

## Options

| Option | Valeur par défaut | Utilisation |
| --- | --- | --- |
| `title` | `"Documentation"` | Nom du site |
| `site` | — | Origine publique pour les URL canoniques et le sitemap |
| `base` | `"/"` | Préfixe des URL |
| `logo` | — | Image de l’en-tête |
| `favicon` | — | Icône de l’onglet du navigateur |
| `links` | `[]` | Liens de l’en-tête |
| `footer` | — | Texte en bas de page |
| `editUrl` | — | URL du dossier du dépôt pour modifier les pages |
| `content` | `"docs"` | Dossier des pages Markdown |
| `output` | `"site"` | Dossier de sortie, distinct des sources |
| `theme` | `"theme"` | Dossier des styles personnalisés |
| `components` | `"components"` | Dossier des modèles HTML |
| `public` | `"public"` | Fichiers copiés tels quels |
| `styles` | `[]` | Feuilles de style dans l’ordre, relatives à theme |
| `sidebar` | — | Groupes et liens ; générés depuis les dossiers si absent |
| `search` | `{}` | Options de recherche ; false la désactive |
| `language` | `"en"` | Langue d’un site monolingue |
| `locales` | — | Langues, dossiers, libellés et direction du texte |
| `clientNavigation` | `true` | Changer de page sans recharger tout le document |
| `strictLinks` | `true` | Détecter pages, fichiers et fragments internes manquants |
| `markdown.html` | `false` | Autoriser le HTML brut dans Markdown |
| `scripts` | `[]` | URL des modules de navigateur |
| `clientComponents` | `{}` | Composants React, Vue, Svelte et modules enregistrés |


## Configuration de base

```json title=miradocs.config.json
{
  "$schema": "./node_modules/miradocs/miradocs.schema.json",
  "title": "Project docs",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```


## Liens et icônes d’en-tête

```json title=miradocs.config.json
{
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-name/your-project",
      "icon": "github",
      "newTab": true
    },
    {
      "label": "Community",
      "url": "https://example.com/community",
      "icon": "custom:/icons/community.svg"
    }
  ]
}
```


## Commandes

:::tabs Gestionnaire de paquets
:::tab npm
| Command | What it does |
| --- | --- |
| `npm run dev` | Build, watch your files, and refresh the preview |
| `npm run build` | Generate the production site |
| `npm run preview` | Build and preview without watching |
:::
:::tab pnpm
| Command | What it does |
| --- | --- |
| `pnpm run dev` | Build, watch your files, and refresh the preview |
| `pnpm run build` | Generate the production site |
| `pnpm run preview` | Build and preview without watching |
:::
:::tab Yarn
| Command | What it does |
| --- | --- |
| `yarn run dev` | Build, watch your files, and refresh the preview |
| `yarn run build` | Generate the production site |
| `yarn run preview` | Build and preview without watching |
:::
:::tab Bun
| Command | What it does |
| --- | --- |
| `bun run dev` | Build, watch your files, and refresh the preview |
| `bun run build` | Generate the production site |
| `bun run preview` | Build and preview without watching |
:::
:::

:::tabs Gestionnaire de paquets
:::tab npm
```sh
npx miradocs build --config miradocs.config.json
npx miradocs dev --port 8001
npx miradocs serve --port 8001
```
:::
:::tab pnpm
```sh
pnpm exec miradocs build --config miradocs.config.json
pnpm exec miradocs dev --port 8001
pnpm exec miradocs serve --port 8001
```
:::
:::tab Yarn
```sh
yarn exec miradocs build --config miradocs.config.json
yarn exec miradocs dev --port 8001
yarn exec miradocs serve --port 8001
```
:::
:::tab Bun
```sh
bunx --no-install miradocs build --config miradocs.config.json
bunx --no-install miradocs dev --port 8001
bunx --no-install miradocs serve --port 8001
```
:::
:::
