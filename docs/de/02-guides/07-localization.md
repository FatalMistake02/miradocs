---
title: Sprachen
description: Füge Sprachen mit locales hinzu.
---
Jeder Eintrag erhält `label` und `path`. Ein leerer Pfad verwendet `docs/`; `de` verwendet `docs/de/` und URLs unter `/de/`. Gleiche Dateinamen verbinden Übersetzungen derselben Seite im Sprachmenü. Jede Sprache hat eine eigene Navigation und einen eigenen Suchindex. Mit `ui` passt du Beschriftungen an, mit `sidebar` bei Bedarf die Navigation. `dir: rtl` unterstützt von rechts nach links geschriebene Sprachen.

## Sprache hinzufügen

```json title=miradocs.config.json
{
  "locales": {
    "en": { "label": "English", "path": "" },
    "es": { "label": "Español", "path": "es" }
  }
}
```

:::file-tree docs
- index.md — English home page
- guides/
  - installation.md
- es/
  - index.md — Spanish home page
  - guides/
    - installation.md
:::


## Oberfläche übersetzen

```json title=miradocs.config.json
{
  "locales": {
    "de": {
      "label": "Deutsch",
      "path": "",
      "ui": {
        "search": "Dokumentation durchsuchen",
        "searchPlaceholder": "Suchen…",
        "outline": "Auf dieser Seite",
        "previous": "Zurück",
        "next": "Weiter"
      }
    }
  }
}
```
