---
title: Cartes
description: Présentez des liens liés dans une grille adaptative.
---
Placez chaque `card` dans `cards`, puis séparez son titre et sa destination par ` | `. Le corps accepte une description en Markdown. Les liens internes respectent `base`. Utilisez `.cards` et `.content-card` pour régler la grille et les cartes, ou des classes d’instance pour des changements ciblés.

## Exemple

:::cards {.guide-cards}
:::card Installation | /fr/getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /fr/guides/theming/
Change fonts, colors, and component styles.
:::
:::


## Ajouter des cartes

```md
:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card A card without a link
Add supporting content here.
:::
:::
```


## Personnaliser

```css title=theme/components.css
.guide-cards { gap: 20px; }
.guide-cards .content-card {
  padding: 24px;
  border-radius: 12px;
}
@media (min-width: 900px) {
  .guide-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```
