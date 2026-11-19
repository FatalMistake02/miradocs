---
title: Karten
description: Stelle verwandte Links in einem anpassungsfähigen Raster dar.
---
Jede `card` steht in `cards`. Trenne Titel und Ziel mit ` | `. Im Inhalt kannst du eine Markdown-Beschreibung hinzufügen. Interne Links berücksichtigen `base`. `.cards` und `.content-card` steuern Raster und Karten; Instanzklassen erlauben gezielte Änderungen.

## Beispiel

:::cards {.guide-cards}
:::card Installation | /de/getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /de/guides/theming/
Change fonts, colors, and component styles.
:::
:::


## Karten hinzufügen

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


## Anpassen

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
