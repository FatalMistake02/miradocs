---
title: Badges
description: 'Utilisez badge pour une étiquette courte, comme un statut ou une version.'
---
Écrivez le texte après le nom de la directive. Gardez les explications longues dans le contenu de la page. Personnalisez `.badge` ou ajoutez une classe d’instance pour modifier couleurs, bordure et typographie.

## Exemple

:::badge Beta
:::


## Ajouter un badge

```md
:::badge Beta {.release-badge}
:::
```


## Personnaliser

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
