---
title: Étapes
description: Présentez des instructions sous forme de séquence numérotée.
---
Placez des titres de niveau trois (`###`) dans `steps` : chacun commence une étape et apparaît aussi dans le sommaire. Chaque étape peut contenir Markdown et composants. Un nouveau bloc recommence à un. Personnalisez `.steps` et `.steps h3::before` pour les numéros et l’espacement.

## Exemple

:::steps
### Install dependencies
Install dependencies using your [package manager](/fr/getting-started/installation/).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::


## Ajouter des étapes

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
:::
```


## Personnaliser

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
