---
title: Aufklappbare Inhalte
description: Mit details können Leser Inhalte öffnen und schließen.
---
Der Text nach der Direktive wird zum Titel. Der Inhalt unterstützt Markdown und weitere Komponenten. Das native Element `details` ist per Tastatur bedienbar. `.details`, `.details-title`, `.details-indicator` und `.details-content` sowie Variablen für Hintergrund, Rahmen, Rundung und Abstand steuern die Gestaltung.

## Beispiel

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/de/guides/theming/).
:::


## Aufklappbaren Inhalt hinzufügen

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```


## Anpassen

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
