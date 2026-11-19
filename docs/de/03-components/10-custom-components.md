---
title: Eigene Komponenten
description: Erstelle wiederverwendbare HTML-Vorlagen in components/.
---
Der Dateiname wird zum Namen der Direktive. `{{title}}` erhält den Titel, `{{content}}` den gerenderten Markdown-Inhalt. Genau ein Platzhalter `{{content}}` ist erforderlich. Instanzklassen werden dem äußeren Element hinzugefügt. Stile liegen in `theme/`. Eigene Module werden über `scripts` eingebunden und auch nach `miradocs:navigate` initialisiert. Für Komponenten mit eigener Initialisierung und Bereinigung kannst du die Framework-Anbindung verwenden.

## Beispiel

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::


## Vorlage erstellen

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


## Stile hinzufügen

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```


## JavaScript hinzufügen

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
