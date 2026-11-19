---
title: Bereitstellung
description: Erzeuge die Website und veröffentliche sie auf einem statischen Hostingdienst.
---
Starte `build` und prüfe das Ergebnis mit `preview`. Veröffentliche den Inhalt von `site/`. Der Server muss für Verzeichnis-URLs `index.html` und für Fehler `404.html` ausliefern. Bei Builds aus Git gehören die Sperrdatei und die passenden Paketmanager-Befehle zur Konfiguration. `base` legt einen URL-Unterpfad fest; `site` ermöglicht kanonische URLs und die Sitemap. Ein fehlgeschlagener Build behält die vorherige Ausgabe bei.

## Build und Vorschau

:::tabs Paketmanager
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


## Hosting konfigurieren

:::tabs Paketmanager
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
