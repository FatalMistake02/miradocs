---
title: Idiomas
description: Adicione idiomas com locales.
---
Cada entrada contém `label` e `path`: um caminho vazio usa `docs/`, enquanto `pt-BR` usa `docs/pt-BR/` e URLs sob `/pt-BR/`. Mantenha os mesmos nomes de arquivo para o seletor abrir a tradução da página atual. Cada idioma possui navegação e índice de busca próprios. Personalize os rótulos com `ui` e, se necessário, defina seu `sidebar`. Use `dir: rtl` para idiomas escritos da direita para a esquerda.

## Adicionar um idioma

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


## Traduzir a interface

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
