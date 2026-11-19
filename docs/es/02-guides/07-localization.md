---
title: Idiomas
description: Añade idiomas con locales.
---
Cada entrada tiene un `label` y un `path`; una ruta vacía utiliza `docs/`, mientras que `es` utiliza `docs/es/` y URL bajo `/es/`. Conserva los mismos nombres de archivo para que el selector abra la traducción de la página actual. Cada idioma tiene navegación e índice de búsqueda propios. Personaliza las etiquetas con `ui` y, si hace falta, define su `sidebar`. Usa `dir: rtl` para idiomas que se leen de derecha a izquierda.

## Añadir un idioma

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


## Traducir la interfaz

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
