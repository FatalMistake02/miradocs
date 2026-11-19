---
title: Langues
description: Ajoutez des langues avec locales.
---
Chaque entrée possède un `label` et un `path` : un chemin vide utilise `docs/`, tandis que `fr` utilise `docs/fr/` et des URL sous `/fr/`. Gardez les mêmes noms de fichiers pour que le sélecteur ouvre la traduction de la page courante. Chaque langue a sa navigation et son index de recherche. Personnalisez les libellés avec `ui` et définissez son `sidebar` si nécessaire. Utilisez `dir: rtl` pour les langues qui se lisent de droite à gauche.

## Ajouter une langue

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


## Traduire l’interface

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
