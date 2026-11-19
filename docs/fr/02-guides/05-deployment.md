---
title: Déploiement
description: Générez le site et publiez-le sur un hébergement statique.
---
Lancez `build`, puis vérifiez le résultat avec `preview`. Publiez le contenu de `site/` ; le serveur doit servir `index.html` pour les URL de dossiers et utiliser `404.html` comme page d’erreur. Si l’hébergeur génère depuis Git, versionnez le fichier de verrouillage et configurez les commandes de votre gestionnaire de paquets. Définissez `base` pour un sous-chemin et `site` pour les URL canoniques et le sitemap. Une génération échouée préserve le résultat précédent.

## Générer et prévisualiser

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


## Configurer l’hébergement

:::tabs Gestionnaire de paquets
:::tab npm
| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `site` |
:::
:::tab pnpm
| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm run build` |
| Output directory | `site` |
:::
:::tab Yarn
| Setting | Value |
| --- | --- |
| Install command | `yarn install --immutable` |
| Build command | `yarn run build` |
| Output directory | `site` |
:::
:::tab Bun
| Setting | Value |
| --- | --- |
| Install command | `bun install --frozen-lockfile` |
| Build command | `bun run build` |
| Output directory | `site` |
:::
:::

```json title=miradocs.config.json
{
  "site": "https://example.com",
  "base": "/handbook/"
}
```
