---
title: インストール
description: サイトを作成して、ドキュメントを書き始めましょう。
---
Node.js 20.19 以降が必要です。生成されるサイトは静的なので、公開先に Node.js は不要です。パッケージマネージャーを選び、プロジェクトの作成、依存関係のインストール、`dev` の実行を行います。保存するとプレビューが更新されます。本文は `docs/`、独自のスタイルは `theme/` に置きます。`build` で `site/` が生成されます。

## サイトの作成

:::tabs パッケージマネージャー
:::tab npm
```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm create miradocs@latest my-docs
cd my-docs
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn dlx create-miradocs@latest my-docs
cd my-docs
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun create miradocs@latest my-docs
cd my-docs
bun install
bun run dev
```
:::
:::

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::


## 最初のページ

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```


## サイトのビルド

:::tabs パッケージマネージャー
:::tab npm
```sh
npm run build
npm run preview
```
:::
:::tab pnpm
```sh
pnpm run build
pnpm run preview
```
:::
:::tab Yarn
```sh
yarn run build
yarn run preview
```
:::
:::tab Bun
```sh
bun run build
bun run preview
```
:::
:::
