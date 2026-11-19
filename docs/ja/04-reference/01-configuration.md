---
title: 設定
description: サイトの設定は miradocs.config.json に記述します。
---
このファイルは標準 JSON を使用します。引用符を省略できる記法は Markdown 内のコンポーネント設定だけに適用されます。タイトル、入力と出力のフォルダー、スタイル、リンク、言語を設定できます。付属のスキーマは、対応エディターで入力補完と検証に利用できます。`styles` のパスは `theme/` からの相対パスです。`dev`、`build`、`preview` で開発、生成、確認を行います。`--config` は設定ファイル、`--port` はポートを変更します。`miradocs:navigate` でページ移動後にスクリプトを初期化できます。

## 設定項目

| 設定 | 既定値 | 用途 |
| --- | --- | --- |
| `title` | `"Documentation"` | サイト名 |
| `site` | — | 正規 URL とサイトマップ用の公開元 |
| `base` | `"/"` | URL のパス接頭辞 |
| `logo` | — | ヘッダー画像 |
| `favicon` | — | ブラウザータブのアイコン |
| `links` | `[]` | ヘッダーのリンク |
| `footer` | — | フッターのテキスト |
| `editUrl` | — | 編集リンク用のリポジトリフォルダー URL |
| `content` | `"docs"` | Markdown ページのフォルダー |
| `output` | `"site"` | 入力ファイルと分離した出力フォルダー |
| `theme` | `"theme"` | 独自スタイルのフォルダー |
| `components` | `"components"` | HTML テンプレートのフォルダー |
| `public` | `"public"` | そのままコピーするファイル |
| `styles` | `[]` | theme からの相対パスによるスタイルシートの読み込み順 |
| `sidebar` | — | グループとリンク。省略時はフォルダーから生成 |
| `search` | `{}` | 検索の設定。false で無効化 |
| `language` | `"en"` | 単一言語サイトの言語コード |
| `locales` | — | 言語、フォルダー、表示名、文字の方向 |
| `clientNavigation` | `true` | 文書全体を再読み込みしないページ移動 |
| `strictLinks` | `true` | 存在しない内部ページ、ファイル、見出しを検出 |
| `markdown.html` | `false` | Markdown 内の HTML を許可 |
| `scripts` | `[]` | ブラウザーモジュールの URL |
| `clientComponents` | `{}` | 登録済みの React、Vue、Svelte とモジュール |


## 基本設定

```json title=miradocs.config.json
{
  "$schema": "./node_modules/miradocs/miradocs.schema.json",
  "title": "Project docs",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```


## ヘッダーのリンクとアイコン

```json title=miradocs.config.json
{
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-name/your-project",
      "icon": "github",
      "newTab": true
    },
    {
      "label": "Community",
      "url": "https://example.com/community",
      "icon": "custom:/icons/community.svg"
    }
  ]
}
```


## コマンド

:::tabs パッケージマネージャー
:::tab npm
| Command | What it does |
| --- | --- |
| `npm run dev` | Build, watch your files, and refresh the preview |
| `npm run build` | Generate the production site |
| `npm run preview` | Build and preview without watching |
:::
:::tab pnpm
| Command | What it does |
| --- | --- |
| `pnpm run dev` | Build, watch your files, and refresh the preview |
| `pnpm run build` | Generate the production site |
| `pnpm run preview` | Build and preview without watching |
:::
:::tab Yarn
| Command | What it does |
| --- | --- |
| `yarn run dev` | Build, watch your files, and refresh the preview |
| `yarn run build` | Generate the production site |
| `yarn run preview` | Build and preview without watching |
:::
:::tab Bun
| Command | What it does |
| --- | --- |
| `bun run dev` | Build, watch your files, and refresh the preview |
| `bun run build` | Generate the production site |
| `bun run preview` | Build and preview without watching |
:::
:::

:::tabs パッケージマネージャー
:::tab npm
```sh
npx miradocs build --config miradocs.config.json
npx miradocs dev --port 8001
npx miradocs serve --port 8001
```
:::
:::tab pnpm
```sh
pnpm exec miradocs build --config miradocs.config.json
pnpm exec miradocs dev --port 8001
pnpm exec miradocs serve --port 8001
```
:::
:::tab Yarn
```sh
yarn exec miradocs build --config miradocs.config.json
yarn exec miradocs dev --port 8001
yarn exec miradocs serve --port 8001
```
:::
:::tab Bun
```sh
bunx --no-install miradocs build --config miradocs.config.json
bunx --no-install miradocs dev --port 8001
bunx --no-install miradocs serve --port 8001
```
:::
:::
