---
title: Installation
description: Erstelle deine Website und beginne mit dem Schreiben.
---
Du benötigst Node.js ab Version 20.19. Die erzeugte Website ist statisch; der Webserver benötigt Node.js nicht. Wähle deinen Paketmanager, erstelle das Projekt, installiere die Abhängigkeiten und starte `dev`. Die Vorschau aktualisiert sich beim Speichern. Inhalte liegen in `docs/`, eigene Stile in `theme/`. `build` erzeugt `site/`.

## Website erstellen

:::tabs Paketmanager
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

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::


## Erste Seite schreiben

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```


## Website erstellen

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
