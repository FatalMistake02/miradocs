---
title: ページのメタデータ
description: ファイルの先頭に、--- の行で囲んだ YAML メタデータを記述します。
---
`title` はページ名、`description` は説明文です。`order` は順序を変更し、`search: false` は検索対象から除外し、`draft: true` は本番ビルドで非表示にします。開発プレビューには下書きも表示されます。`layout: landing` はサイドバーを省き、`sidebar: false` は自動ナビゲーションからページを外します。設定名は例の表記のまま使用してください。

## 設定項目

| 設定 | 既定値 | 用途 |
| --- | --- | --- |
| `title` | — | タイトル。省略時はファイル名を使用 |
| `description` | `""` | 導入文とメタデータの説明 |
| `layout` | `"docs"` | landing でサイドバーを省略 |
| `order` | `0` | ファイル名の順序より優先される並び順 |
| `draft` | `false` | 開発時のみ表示 |
| `sidebar` | `true` | ナビゲーションと前後のページリンクに含める |
| `search` | `true` | 検索結果に含める |


## 使用例

```md title=docs/example.md
---
title: Installation
description: Install the project and start a preview.
layout: docs
order: 1
draft: false
sidebar: true
search: true
---

## Requirements

Write your content here.
```


## よく使う設定

```yaml
---
title: My project
description: What the project does.
layout: landing
sidebar: false
---
```

```yaml
---
title: Upcoming changes
draft: true
---
```
