---
title: 多言語対応
description: locales に言語を追加します。
---
各言語に `label` と `path` を指定します。空のパスは `docs/` を使い、`ja` は `docs/ja/` と `/ja/` 以下の URL を使います。各言語で同じファイル名を使用すると、言語切り替え時に対応するページが開きます。ナビゲーションと検索インデックスは言語ごとに分かれています。表示文言は `ui`、独自のナビゲーションは `sidebar` で設定します。右から左へ書く言語には `dir: rtl` を指定します。

## 言語の追加

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


## 表示文言の翻訳

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
