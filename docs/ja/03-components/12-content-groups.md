---
title: コンテンツグループ
description: group を使うと、Markdown の一部分にクラスを適用できます。
---
見出し、画像、コード、他のコンポーネントを含められます。`{.my-class}` は `.content-group` コンテナーに追加され、`theme/` からその内容だけを装飾できます。グループは入れ子にできます。スタイル用のコンテナーを追加するためだけに、HTML テンプレートを作る必要はありません。

## グループの追加

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [Installation guide](/getting-started/installation/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```


## 例

:::group {.group-example}
### A grouped section

This paragraph and its [link](/ja/guides/theming/) share one container.
:::


## 一つの要素の装飾

```md
:::group {.diagram}
![Architecture](/images/architecture.svg)
:::
```

```css title=theme/components.css
.diagram img {
  max-width: 500px;
  border-radius: 16px;
}
```
