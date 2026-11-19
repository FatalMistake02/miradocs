---
title: Inhaltsgruppen
description: Mit group wendest du eine Klasse auf einen Markdown-Abschnitt an.
---
Gruppen können Überschriften, Bilder, Code und andere Komponenten enthalten. `{.meine-klasse}` wird dem Container `.content-group` hinzugefügt und erlaubt gezielte Stile aus `theme/`. Gruppen lassen sich verschachteln. Für einen einfachen Stilcontainer ist keine eigene HTML-Vorlage nötig.

## Gruppe hinzufügen

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


## Beispiel

:::group {.group-example}
### A grouped section

This paragraph and its [link](/de/guides/theming/) share one container.
:::


## Ein Element gestalten

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
