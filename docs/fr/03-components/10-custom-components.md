---
title: Composants personnalisés
description: Créez un modèle HTML réutilisable dans components/.
---
Le nom du fichier devient celui de la directive. `{{title}}` reçoit le titre et `{{content}}` le corps Markdown rendu ; incluez exactement un marqueur `{{content}}`. Les classes d’instance sont ajoutées à l’élément extérieur. Placez les styles dans `theme/`. Pour un comportement propre, ajoutez un module à `scripts` et initialisez-le aussi après `miradocs:navigate`. Les composants ayant leur propre montage et nettoyage peuvent être enregistrés comme composants de framework.

## Exemple

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::


## Créer un modèle

```html title=components/example.html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

```md
:::example Release notes {.release-summary}
Add a short summary, a list of changes, or a link to the full release.
:::
```


## Ajouter des styles

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```


## Ajouter JavaScript

```json title=miradocs.config.json
{
  "scripts": ["/example.js"]
}
```

```js title=public/example.js
function initializeExample() {
  document.querySelectorAll(".feature-card").forEach(card => {
    if (card.dataset.initialized) return;
    card.dataset.initialized = "true";
    // Set up the behavior for this card.
  });
}

initializeExample();
document.addEventListener("miradocs:navigate", initializeExample);
```
