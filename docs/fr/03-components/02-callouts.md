---
title: Encadrés
description: 'Mettez une information en évidence avec note, tip, caution ou danger.'
---
Le titre est facultatif et le corps accepte Markdown. Choisissez le type selon le contenu plutôt que selon la couleur. Personnalisez `.callout`, `.callout-title` et `--callout-color`, ou ajoutez une classe à une instance précise.

## Exemples

:::note
Your theme styles load after the default CSS.
:::

:::tip
Add a class to style one component without changing the others.
:::

:::caution
Changes made directly in `site/` are replaced by the next build.
:::

:::danger
Deleting your source folder removes the pages used to build the site.
:::


## Ajouter un encadré

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```


## Personnaliser

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```
