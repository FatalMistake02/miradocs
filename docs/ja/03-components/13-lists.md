---
title: リスト
description: list で Markdown の項目をまとめます。
---
タイトルは任意で、`search: true` を指定するとヘッダーに検索欄が付きます。`columns` は 1〜6 列を指定でき、幅が狭いと列数が減ります。`columnDividers: false` で縦の区切り線を消せます。`align: [start, end]` は列ごとの配置を指定します。`center`、`left`、`right` や全列共通の単一値も使用できます。検索は大文字・小文字やアクセントを区別せず、入れ子の項目を親と一緒に表示して結果を詰めます。`placeholder` と `empty` で文言を変更し、クラスと `--list-*` 変数で装飾できます。

## 設定項目

| 設定 | 既定値 | 用途 |
| --- | --- | --- |
| `title` | — | 任意のタイトル |
| `search` | `false` | ヘッダーの検索欄 |
| `columns` | `1` | 最大列数。1〜6 |
| `columnDividers` | `true` | 列の縦の区切り線 |
| `align` | `"start"` | 共通または列ごとの配置 |
| `placeholder` | `"このリストを検索…"` | 検索欄のテキストとラベル |
| `empty` | `"一致する項目がありません。"` | 一致する項目がない場合のメッセージ |


## 例

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/ja/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/ja/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/ja/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/ja/guides/deployment/)  
  Build your site and put it online.
:::


## リストの追加

:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::

```md
:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::
```


## 検索の追加

```md
:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/guides/deployment/)  
  Build your site and put it online.
:::
```


## 列の設定

```md
:::list { title: Resources, columns: 2 }
- Installation
- Configuration
- Theming
- Deployment
:::
```

:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] } {.resource-list}
- Installation
- Configuration
- Theming
- Deployment
:::

```md
:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] }
- Installation
- Configuration
- Theming
- Deployment
:::
```


## カスタマイズ

```css title=theme/components.css
.guide-list {
  --list-bg: var(--bg);
  --list-border: var(--border);
  --list-radius: 10px;
  --list-padding: 20px;
  --list-column-min-width: 220px;
  --list-search-width: 220px;
  --list-column-divider: transparent;
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```
