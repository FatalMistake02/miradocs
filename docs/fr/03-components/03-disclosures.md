---
title: Contenu dépliable
description: Utilisez details pour un contenu que le lecteur peut ouvrir et fermer.
---
Le texte de l’ouverture devient le titre ; le corps accepte Markdown et d’autres composants. Le contrôle repose sur l’élément natif `details` et fonctionne au clavier. Personnalisez `.details`, `.details-title`, `.details-indicator` et `.details-content`, ou les variables de fond, bordure, rayon et espacement.

## Exemple

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/fr/guides/theming/).
:::


## Ajouter un contenu dépliable

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```


## Personnaliser

```css title=theme/components.css
.output-details {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-border: var(--border);
  --details-header-hover: var(--hover);
}
.output-details .details-content { font-size: 14px; }
```
