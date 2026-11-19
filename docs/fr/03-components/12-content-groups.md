---
title: Groupes de contenu
description: Utilisez group pour appliquer une classe à une section de Markdown.
---
Le groupe peut contenir titres, images, code ou autres composants. `{.ma-classe}` est ajoutée au conteneur `.content-group` et permet de cibler ce contenu depuis `theme/`. Les groupes peuvent être imbriqués. Aucun modèle HTML n’est nécessaire pour ajouter un conteneur de style.

## Ajouter un groupe

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [Installation guide](/getting-started/installation/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```


## Exemple

:::group {.group-example}
### A grouped section

This paragraph and its [link](/fr/guides/theming/) share one container.
:::


## Styliser un élément

```md
:::group {.diagram}
![Architecture](/images/architecture.svg)
:::
```

```css title=theme/components.css
.diagram img {
  max-width: 500px;
  border-radius: 16px;
}
```
