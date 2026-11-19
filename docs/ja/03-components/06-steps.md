---
title: 手順
description: 操作を番号付きの手順として表示します。
---
`steps` の中にレベル 3 の見出し (`###`) を書くと、それぞれが新しい手順になり、ページの目次にも表示されます。各手順には Markdown やコンポーネントを含められます。新しいブロックでは番号が 1 から始まります。`.steps` と `.steps h3::before` で番号や余白を調整できます。

## 例

:::steps
### Install dependencies
Install dependencies using your [package manager](/ja/getting-started/installation/).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::


## 手順の追加

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
:::
```


## カスタマイズ

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
