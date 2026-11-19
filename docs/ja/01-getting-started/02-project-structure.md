---
title: プロジェクト構成
description: ファイルとフォルダーでサイトを整理します。
---
ページは `docs/`、HTML テンプレートは `components/`、スタイルは `theme/`、そのままコピーするファイルは `public/` に置きます。設定ファイルは `miradocs.config.json` です。数字の接頭辞は表示順を決め、URL からは取り除かれます。`index.md` は各フォルダーのトップページになります。`site/` はビルドごとに置き換わるため、直接編集しないでください。

## 使用例

:::file-tree Project
- docs/ — Markdown pages
  - index.md
  - 01-guides/
    - 01-installation.md
- theme/ — your styles
  - tokens.css
  - components.css
- components/ — reusable components
- public/ — images, fonts, and downloads
- miradocs.config.json
- package.json
- site/ — generated output
:::
