---
title: コンテンツ形式
description: ページは YAML メタデータを含む .md ファイルです。
---
Markdown では表、タスクリスト、脚注、URL の自動リンク、コンポーネントを使用できます。サイト設定には JSON、テンプレートには HTML、スタイルには CSS、追加の動作には JavaScript を使います。JSX、Vue、Svelte はページ形式ではなく、登録したフレームワークコンポーネントとして利用します。コードブロックは内容を表示するだけで、実行しません。Markdown 内の HTML には `markdown.html: true` が必要です。構文は [Markdown ガイド](https://www.markdownguide.org/extended-syntax/)で確認できます。

## ページのメタデータ

```md title=docs/example.md
---
title: "Install: Windows"
description: Set up the project on Windows.
draft: false
---

## Requirements

Write the page content here.
```


## HTML

```json title=miradocs.config.json
{
  "markdown": { "html": true }
}
```

```md
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.
```


## コードの例

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````
