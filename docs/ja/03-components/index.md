---
title: コンポーネントの使い方
description: Markdown にコンポーネントを直接記述できます。
---
開始行 `:::name`、本文、終了行 `:::` をそれぞれ別の行に書きます。設定は `{ title: ガイド, search: true }` のようなオブジェクトで指定します。キーや単純な文字列に引用符は不要です。項目はカンマで区切り、コロンの後には空白を入れます。カンマや特殊な記号を含む文字列は引用符で囲んでください。既存の JSON も使用できます。`{.my-class}` を付けると、一つのインスタンスだけを装飾できます。

:::cards
:::card テーブル | /ja/components/tables/
:::
:::card タブ | /ja/components/tabs/
:::
:::card 注記ボックス | /ja/components/callouts/
:::
:::card 折りたたみ | /ja/components/disclosures/
:::
:::card カード | /ja/components/cards/
:::
:::card ボタン | /ja/components/buttons/
:::
:::card 手順 | /ja/components/steps/
:::
:::card ファイルツリー | /ja/components/file-trees/
:::
:::card バッジ | /ja/components/badges/
:::
:::card コードブロック | /ja/components/code-blocks/
:::
:::card 独自コンポーネント | /ja/components/custom-components/
:::
:::card フレームワークのコンポーネント | /ja/components/framework-components/
:::
:::card コンテンツグループ | /ja/components/content-groups/
:::
:::card リスト | /ja/components/lists/
:::
:::

## 使用例

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

```md
:::list { title: Guides, search: true, columns: 2 }
- Installation
- Theming
:::
```

```md
:::list { title: "Setup: Windows, macOS, and Linux", search: true }
- Installation
- Configuration
:::
```
