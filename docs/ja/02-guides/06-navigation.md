---
title: ナビゲーション
description: フォルダーはサイドバーのグループ、ファイルはページになります。
---
数字の接頭辞はタイトルを変えずに順序を指定します。`sidebar` を設定すると、グループ、ページ、外部リンクを明示的に並べられます。`collapsed` はグループの初期状態を閉じた状態にします。ページ名にはメタデータのタイトルが使われます。目次はレベル 2〜6 の見出しを反映します。ページ移動では文書全体を再読み込みせずに URL を更新します。完全な読み込みに戻す場合は `clientNavigation: false` を指定します。

## 使用例

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::


## サイドバーの設定

```json title=miradocs.config.json
{
  "sidebar": [
    {
      "label": "Guides",
      "items": [
        { "page": "guides/installation" },
        { "page": "guides/configuration" }
      ]
    },
    {
      "label": "Reference",
      "collapsed": true,
      "items": [{ "page": "reference" }]
    },
    { "label": "GitHub", "link": "https://github.com" }
  ]
}
```


## 使用例

```md
## Installation

### Windows

### Linux

## Configuration
```
