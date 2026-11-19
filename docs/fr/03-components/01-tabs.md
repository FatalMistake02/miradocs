---
title: Onglets
description: Regroupez des exemples liés dans plusieurs panneaux.
---
Chaque `tab` doit être directement dans `tabs`, avec son libellé et sa propre fermeture. Le premier panneau est sélectionné au départ. Les panneaux acceptent Markdown et composants imbriqués. Les flèches gauche et droite changent d’onglet ; Début et Fin sélectionnent le premier et le dernier. Utilisez `.tabs`, `.tab-list` et `.tab-panel` pour personnaliser le groupe ou une instance.

## Exemple

:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::


## Ajouter des onglets

````md
:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::
````


## Personnaliser

```css title=theme/components.css
.build-tabs { border-radius: 16px; }
.build-tabs .tab-list { gap: 28px; }
.build-tabs .tab-panel { padding: 12px 24px; }
.build-tabs [role="tab"][aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```
