---
title: Pages d’accueil
description: Créez une page de présentation sans barres latérales.
---
Ajoutez `layout: landing` et `sidebar: false` aux métadonnées, puis rédigez votre introduction et ajoutez liens et composants en Markdown. Utilisez un bouton pour commencer et des cartes pour les rubriques principales. Appliquez des classes aux instances à personnaliser dans `theme/` ; les pages de documentation conservent leur présentation habituelle.

## Définir la disposition

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```


## Modifier l’apparence

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```
