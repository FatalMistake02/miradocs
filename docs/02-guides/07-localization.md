---
title: Localization
description: Give each language its own content, navigation, and interface text.
---
## Locale folders

```json
{
  "locales": {
    "en": { "label": "English", "path": "" },
    "es": { "label": "Español", "path": "es" }
  }
}
```

The root locale reads `docs/` and Spanish reads `docs/es/`. The root locale excludes other language folders. Keep equivalent source routes in each language so the switcher can open the corresponding page. When a translation is missing, it opens that language's home page.

## Interface text

English, Spanish, and French interface dictionaries are included. Other languages fall back to English. Override any text through a locale's `ui` object. Set `dir: rtl` for right-to-left content. Search indexes are separated by locale.

```json
{
  "locales": {
    "de": {
      "label": "Deutsch", "path": "",
      "ui": { "search": "Dokumentation durchsuchen", "outline": "Auf dieser Seite" }
    }
  }
}
```

See `src/i18n.js` for the complete list of interface keys.
