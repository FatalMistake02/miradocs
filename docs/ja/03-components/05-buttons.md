---
title: ボタン
description: button を使うと、ナビゲーション用リンクをボタンの見た目にできます。
---
ラベルと URL を ` | ` で区切り、`:::` で閉じます。要素自体はリンクなので、ページ移動に使用します。インスタンスのクラスと `.action-button` を使い、独自のスタイルシートから装飾できます。

## 例

:::button Get started | /ja/getting-started/installation/
:::


## ボタンの追加

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```


## カスタマイズ

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```
