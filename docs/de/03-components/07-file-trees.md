---
title: Dateibäume
description: >-
  Zeige Dateien und Ordner mit einer verschachtelten Markdown-Liste in
  file-tree.
---
Einrückungen bilden die Hierarchie; ein abschließender Schrägstrich kennzeichnet leere Ordner. Die angegebene Reihenfolge bleibt erhalten. ` — ` trennt eine Beschreibung ab. Namen unterstützen Formatierung und Links. `{ title: Projekt, collapsed: true }` schließt Ordner anfangs. Icons werden nach Dateiname und Erweiterung gewählt. Mit `icons` verwendest du eigene Bilder, mit `icons: false` neutrale Icons. Variablen steuern Einrückung und Verbindungslinien.

## Beispiel

:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::


## Dateibaum hinzufügen

```md
:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::
```

```md
:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::
```

:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::


## Datei-Icons

```md
:::file-tree { title: Project, icons: { .mira: /icons/mira.svg, special.config: /icons/config.svg } }
- index.mira
- special.config
:::
```


## Anpassen

```css title=theme/components.css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```
