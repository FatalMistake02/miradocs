---
title: カード
description: 関連するリンクをレスポンシブなグリッドに表示します。
---
各 `card` を `cards` 内に置き、タイトルとリンク先を ` | ` で区切ります。本文には Markdown の説明を追加できます。内部リンクには `base` が適用されます。`.cards` と `.content-card` でグリッドとカードを調整し、独自のクラスで特定のインスタンスだけを変更できます。

## 例

:::cards {.guide-cards}
:::card Installation | /ja/getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /ja/guides/theming/
Change fonts, colors, and component styles.
:::
:::


## カードの追加

```md
:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card A card without a link
Add supporting content here.
:::
:::
```


## カスタマイズ

```css title=theme/components.css
.guide-cards { gap: 20px; }
.guide-cards .content-card {
  padding: 24px;
  border-radius: 12px;
}
@media (min-width: 900px) {
  .guide-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```
