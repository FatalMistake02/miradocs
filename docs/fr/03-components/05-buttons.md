---
title: Boutons
description: Donnez à un lien de navigation l’apparence d’un bouton avec button.
---
Séparez le libellé et l’URL par ` | `, puis fermez le composant avec `:::`. Il s’agit toujours d’un lien : utilisez-le pour naviguer. Ajoutez une classe d’instance et personnalisez `.action-button` dans vos feuilles de style.

## Exemple

:::button Get started | /fr/getting-started/installation/
:::


## Ajouter un bouton

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```


## Personnaliser

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```
