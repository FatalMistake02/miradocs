---
title: Localization
description: Add languages and translate your site's interface.
---
## Add a language

Set `locales` in your configuration. Give each language a label and a content path:

```json title=miradocs.config.json
{
  "locales": {
    "en": { "label": "English", "path": "" },
    "es": { "label": "Español", "path": "es" }
  }
}
```

An empty path uses `docs/`. The Spanish locale reads `docs/es/` and uses `/es/` in its URLs.

:::file-tree docs
- index.md — English home page
- guides/
  - installation.md
- es/
  - index.md — Spanish home page
  - guides/
    - installation.md
:::

### Match translated pages

Use the same relative filename in each language. In this example, the language switcher connects `/guides/installation/` with `/es/guides/installation/`.

When a matching translation is missing, the switcher opens that language's home page. Each language has its own search index.

## Translate the interface

English, Spanish, French, German, Portuguese, Japanese, and Simplified Chinese interface text is included. Override individual labels in a locale's `ui` object. Other languages use English for labels you have not supplied.

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

Common keys include `search`, `searchPlaceholder`, `outline`, `menu`, `previous`, `next`, `copy`, and `copied`. The full list is in the installed package's `src/i18n.js`.

### Right-to-left languages

Set `"dir": "rtl"` on the locale. Use logical CSS properties such as `padding-inline-start` in your custom styles so they follow the reading direction.

## Translate navigation

Folders build a separate sidebar for each language. For a custom arrangement, add a `sidebar` array to the locale. It replaces the site's global sidebar for that language. See [Navigation](/guides/navigation/).
