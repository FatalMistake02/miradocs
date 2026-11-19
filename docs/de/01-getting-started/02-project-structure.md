---
title: Projektstruktur
description: Organisiere die Website mit Dateien und Ordnern.
---
Seiten liegen in `docs/`, HTML-Vorlagen in `components/`, Stile in `theme/` und unverändert kopierte Dateien in `public/`. `miradocs.config.json` enthält die Konfiguration. Zahlenpräfixe bestimmen die Reihenfolge und erscheinen nicht in den URLs. `index.md` ist die Startseite des jeweiligen Ordners. Bearbeite `site/` nicht; bei jedem erfolgreichen Build wird der Inhalt ersetzt.

## Beispiele

:::file-tree Project
- docs/ — Markdown pages
  - index.md
  - 01-guides/
    - 01-installation.md
- theme/ — your styles
  - tokens.css
  - components.css
- components/ — reusable components
- public/ — images, fonts, and downloads
- miradocs.config.json
- package.json
- site/ — generated output
:::
