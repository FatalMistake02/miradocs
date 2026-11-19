---
title: Listen
description: Gruppiere Markdown-Einträge mit list.
---
Der Titel ist optional; `search: true` ergänzt eine Suche im Kopfbereich. `columns` erlaubt 1 bis 6 Spalten und verringert die Anzahl bei wenig Platz. `columnDividers: false` blendet senkrechte Linien aus. `align: [start, end]` richtet einzelne Spalten aus. Auch `center`, `left`, `right` oder ein gemeinsamer Wert sind möglich. Die Suche ignoriert Großschreibung und Akzente, behält verschachtelte Inhalte zusammen und ordnet Treffer neu an. `placeholder` und `empty` ändern Meldungen. Instanzklassen und `--list-*`-Variablen steuern die Gestaltung.

## Optionen

| Option | Standard | Verwendung |
| --- | --- | --- |
| `title` | — | Optionaler Titel |
| `search` | `false` | Suche im Kopfbereich |
| `columns` | `1` | Maximale Spaltenzahl: 1 bis 6 |
| `columnDividers` | `true` | Senkrechte Trennlinien |
| `align` | `"start"` | Gemeinsame Ausrichtung oder pro Spalte |
| `placeholder` | `"Diese Liste durchsuchen…"` | Text und Beschriftung des Suchfelds |
| `empty` | `"Keine passenden Einträge."` | Meldung bei fehlenden Treffern |


## Beispiel

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/de/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/de/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/de/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/de/guides/deployment/)  
  Build your site and put it online.
:::


## Liste hinzufügen

:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::

```md
:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::
```


## Suche hinzufügen

```md
:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/guides/deployment/)  
  Build your site and put it online.
:::
```


## Spalten verwenden

```md
:::list { title: Resources, columns: 2 }
- Installation
- Configuration
- Theming
- Deployment
:::
```

:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] } {.resource-list}
- Installation
- Configuration
- Theming
- Deployment
:::

```md
:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] }
- Installation
- Configuration
- Theming
- Deployment
:::
```


## Anpassen

```css title=theme/components.css
.guide-list {
  --list-bg: var(--bg);
  --list-border: var(--border);
  --list-radius: 10px;
  --list-padding: 20px;
  --list-column-min-width: 220px;
  --list-search-width: 220px;
  --list-column-divider: transparent;
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```
