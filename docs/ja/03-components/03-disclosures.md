---
title: 折りたたみ
description: details は、読者が開閉できるコンテンツに使用します。
---
開始行の文字列がタイトルになり、本文には Markdown や他のコンポーネントを含められます。標準の `details` 要素を使い、キーボードでも操作できます。`.details`、`.details-title`、`.details-indicator`、`.details-content` と、背景、枠線、角丸、余白の変数で装飾します。

## 例

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/ja/guides/theming/).
:::


## 折りたたみの追加

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```


## カスタマイズ

```css title=theme/components.css
.output-details {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-border: var(--border);
  --details-header-hover: var(--hover);
}
.output-details .details-content { font-size: 14px; }
```
