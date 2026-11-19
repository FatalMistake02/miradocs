---
title: コンテンツの作成
description: Markdown と YAML メタデータでページを作成します。
---
先頭に `title` と必要に応じて `description` を指定します。ページタイトルは自動表示されるため、本文は `##` から始め、下位の節には `###` を使います。リンク、画像、表、タスクリスト、脚注、コンポーネントを使用できます。`.md` ファイルへのリンクはページ URL に変換されます。画像やダウンロード用ファイルは `public/` に置きます。存在しない内部ページ、ファイル、見出しへのリンクはビルド時に検出されます。基本構文は [CommonMark チュートリアル](https://commonmark.org/help/tutorial/)で確認できます。

## ページの作成

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

:::tabs Package manager
:::tab npm
```sh
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun install
bun run dev
```
:::
:::

:::note Production build
Run the `build` script to generate the finished site.
:::
````


## リンクと画像の追加

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```


## コンポーネントの追加

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::
