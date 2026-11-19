---
title: ファイルツリー
description: file-tree の中に入れ子の Markdown リストを書き、ファイルとフォルダーを表示します。
---
インデントが階層を表し、末尾のスラッシュは空のフォルダーを示します。記述順がそのまま使われます。` — ` の後に説明を書けます。名前には装飾やリンクを使用できます。`{ title: プロジェクト, collapsed: true }` でフォルダーを初期状態で閉じます。アイコンは名前と拡張子から選ばれ、`icons` で独自画像、`icons: false` で中立的なアイコンを使えます。変数でインデントとガイド線を調整します。

## 例

:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::


## ファイルツリーの追加

```md
:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::
```

```md
:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::
```

:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::


## ファイルアイコン

```md
:::file-tree { title: Project, icons: { .mira: /icons/mira.svg, special.config: /icons/config.svg } }
- index.mira
- special.config
:::
```


## カスタマイズ

```css title=theme/components.css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```
