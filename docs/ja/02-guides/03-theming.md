---
title: テーマとスタイル
description: フォント、色、コンポーネントは theme/ で調整します。
---
スタイルシートを `styles` に登録すると、標準 CSS の後に指定順で読み込まれます。レイアウトは共通変数で定義し、色だけをテーマごとに変更できます。本文は `--font`、コードは `--mono`、ナビゲーションの文字サイズは `--sidebar-font-size`、`--sidebar-group-font-size`、`--outline-font-size` で指定します。ディレクティブに `{.my-class}` を付けると、そのインスタンスだけを装飾できます。通常の Markdown には `group` を使います。

## スタイルの追加

```json title=miradocs.config.json
{
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```


## 色とレイアウト

```css title=theme/tokens.css
:root {
  --radius: 10px;
  --sidebar-width: 248px;
  --content-width: 820px;
  --accent: #9c2472;
}
```

```css title=theme/tokens.css
:root {
  --bg: #ffffff;
  --text: #202020;
}
html[data-theme="dark"] {
  --bg: #141414;
  --text: #e8e8e8;
}
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]):not([data-theme="dark"]) {
    --bg: #141414;
    --text: #e8e8e8;
  }
}
```

```css title=theme/tokens.css
:root {
  --accent-gradient: linear-gradient(110deg, #ff0951b8, #f50983);
  --header-divider: var(--accent-gradient);
}
```


## 文字のスタイル

```css title=theme/tokens.css
:root {
  --font: "Segoe UI", system-ui, sans-serif;
  --mono: "Cascadia Code", ui-monospace, monospace;
}
```

```css title=theme/tokens.css
@font-face {
  font-family: "My Sans";
  src: url("../fonts/my-sans.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
:root {
  --font: "My Sans", system-ui, sans-serif;
}
```

```css title=theme/tokens.css
:root {
  --brand-font-size: 24px;
  --brand-font-weight: 500;
}
```


## コンポーネントのスタイル

```md title=docs/example.md
:::note Before you begin {.setup-note}
Install the required tools.
:::

:::tabs Install {.install-tabs}
:::tab npm
Run `npm install`.
:::
:::tab pnpm
Run `pnpm install`.
:::
:::tab Yarn
Run `yarn install`.
:::
:::tab Bun
Run `bun install`.
:::
:::

:::details More options {.advanced-options}
Additional configuration.
:::

:::file-tree Project {.project-files}
- docs/
  - index.md
:::
```

```css title=theme/components.css
.setup-note { border-inline-start-width: 4px; }
.install-tabs .tab-list { gap: 28px; }
.advanced-options { --details-radius: 14px; }
.project-files { --tree-row-height: 36px; }
```

```md
:::group {.installation-section}
## Installation

Read the [Installation guide](/getting-started/installation/).
:::
```

```css title=theme/components.css
.installation-section h2 { font-weight: 500; }
.installation-section a { text-decoration-color: var(--accent); }
```
