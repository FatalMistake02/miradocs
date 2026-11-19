---
title: 主题与样式
description: 在 theme/ 中自定义字体、颜色和组件。
---
将样式表加入 `styles`，它们会在默认 CSS 之后按指定顺序加载。布局使用共享变量，颜色可按主题分别设置。`--font` 控制正文，`--mono` 控制代码。侧栏字号使用 `--sidebar-font-size`、`--sidebar-group-font-size` 和 `--outline-font-size`。在任意指令后添加 `{.my-class}`，即可单独设置该实例的样式；普通 Markdown 可以用 `group` 包裹。

## 添加样式

```json title=miradocs.config.json
{
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```


## 颜色与布局

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


## 字体排版

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


## 组件样式

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
