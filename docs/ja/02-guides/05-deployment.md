---
title: デプロイ
description: ビルドしたサイトを静的ホスティングに公開します。
---
`build` を実行し、`preview` で確認してから `site/` の内容を公開してください。ディレクトリの URL には `index.html`、エラーページには `404.html` を配信するよう設定します。Git からビルドする場合はロックファイルを保存し、使用するパッケージマネージャーのコマンドを指定します。サブパスには `base`、正規 URL とサイトマップには `site` を設定します。ビルドに失敗しても、前回の出力は保持されます。

## ビルドとプレビュー

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


## ホスティングの設定

:::tabs パッケージマネージャー
:::tab npm
| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `site` |
:::
:::tab pnpm
| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm run build` |
| Output directory | `site` |
:::
:::tab Yarn
| Setting | Value |
| --- | --- |
| Install command | `yarn install --immutable` |
| Build command | `yarn run build` |
| Output directory | `site` |
:::
:::tab Bun
| Setting | Value |
| --- | --- |
| Install command | `bun install --frozen-lockfile` |
| Build command | `bun run build` |
| Output directory | `site` |
:::
:::

```json title=miradocs.config.json
{
  "site": "https://example.com",
  "base": "/handbook/"
}
```
