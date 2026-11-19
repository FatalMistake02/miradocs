---
title: 注記ボックス
description: note、tip、caution、danger で情報を目立たせます。
---
タイトルは省略でき、本文には Markdown を使用できます。色だけでなく内容の意味に合わせて種類を選びます。`.callout`、`.callout-title`、`--callout-color` で装飾し、独自のクラスを付ければ特定のボックスだけを変更できます。

## 使用例

:::note
Your theme styles load after the default CSS.
:::

:::tip
Add a class to style one component without changing the others.
:::

:::caution
Changes made directly in `site/` are replaced by the next build.
:::

:::danger
Deleting your source folder removes the pages used to build the site.
:::


## 注記ボックスの追加

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```


## カスタマイズ

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```
