---
title: ランディングページ
description: サイドバーのない紹介ページを作成できます。
---
メタデータに `layout: landing` と `sidebar: false` を指定し、Markdown で紹介文、リンク、コンポーネントを追加します。開始用のボタンや主要セクションへのカードを配置できます。各インスタンスのクラスを使って `theme/` から装飾してください。他のドキュメントページは通常のレイアウトのままにできます。

## レイアウトの設定

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```


## 見た目の変更

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```
