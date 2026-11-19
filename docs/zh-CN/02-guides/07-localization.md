---
title: 多语言
description: 通过 locales 添加语言，每种语言设置 label 和 path。
---
空路径使用 `docs/`；`zh-CN` 使用 `docs/zh-CN/`，URL 位于 `/zh-CN/` 下。不同语言使用相同的相对文件名，语言选择器就能跳转到当前页面的对应译文。每种语言都有自己的导航和搜索索引。通过 `ui` 自定义界面文字，必要时为该语言设置 `sidebar`。从右向左书写的语言可以使用 `dir: rtl`。

## 添加语言

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


## 翻译界面

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
