---
title: Theming
description: Change fonts, colors, layout, and individual components with CSS.
---
Your styles live in `theme/`. Start with variables for site-wide changes, then use CSS selectors for the details.

## Add your styles

Create a stylesheet and list it in `miradocs.config.json`. Paths in `styles` are relative to the theme folder, and files load in the order listed, after the default CSS.

```json title=miradocs.config.json
{
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```

Keep your changes in these source files. The generated `site/` directory is replaced on each build.

## Colors and layout

Override variables in `theme/tokens.css`:

```css title=theme/tokens.css
:root {
  --radius: 10px;
  --sidebar-width: 248px;
  --content-width: 820px;
  --accent: #9c2472;
}
```

### Light and dark themes

Set shared layout values once in `:root`. Override colors for each theme as needed:

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

The media query applies your dark palette when the reader uses the system theme. If you only need the default palettes, leave these color overrides out.

### Header accent

Define a gradient with `--accent-gradient`. Set `--header-divider` to use it for the line under the header:

```css title=theme/tokens.css
:root {
  --accent-gradient: linear-gradient(110deg, #ff0951b8, #f50983);
  --header-divider: var(--accent-gradient);
}
```

Use `--header-divider: var(--border)` for the default solid line.

## Typography

### Change fonts

Set `--font` for the interface and article text, and `--mono` for code:

```css title=theme/tokens.css
:root {
  --font: "Segoe UI", system-ui, sans-serif;
  --mono: "Cascadia Code", ui-monospace, monospace;
}
```

Use `--sidebar-font-size`, `--sidebar-group-font-size`, and `--outline-font-size` to change the navigation and page outline text sizes.

### Load your own font

Put the font in `public/fonts/` and load it from your stylesheet. This example uses a variable WOFF2 font:

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

### Header title

The header title defaults to `22px` and regular weight (`400`). Change either value through your theme:

```css title=theme/tokens.css
:root {
  --brand-font-size: 24px;
  --brand-font-weight: 500;
}
```

## Component styles

A component's default class applies to every instance. For example, `.tabs` targets all tab groups. Add your own class to style just one.

### Style one instance

Append `{.class-name}` to the opening directive. You can use several classes, such as `{.install-tabs .wide}`.

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

Classes work on built-in components, custom HTML templates, and framework component containers. The default classes stay in place alongside your own.

### Target part of a component

Use a descendant selector to reach an element inside your instance. `.install-tabs .tab-list`, for example, changes the tab row inside that group. Each [component guide](/components/) lists its main selectors.

For React, Vue, or Svelte components, style the mount container or pass CSS variables and props. Framework-scoped styles and shadow DOM keep their own styling boundaries.

### Style ordinary Markdown

Wrap a section in a [content group](/components/content-groups/) to target its headings, paragraphs, links, images, tables, or code blocks:

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

## Theme variables

| Area | Variables |
| --- | --- |
| Surfaces | `--bg`, `--surface`, `--surface-raised`, `--hover`, `--selected` |
| Text | `--text`, `--muted`, `--accent`, `--accent-text` |
| Borders and shape | `--border`, `--radius`, `--panel-radius` |
| Layout | `--header-height`, `--sidebar-width`, `--outline-width`, `--content-width` |
| Typography | `--font`, `--mono`, `--brand-font-weight`, `--brand-font-size` |
| Code | `--code-bg`, `--code-text`, `--code-keyword`, `--code-string`, `--code-number`, `--code-comment` |
| Feedback | `--info`, `--warning`, `--danger` |
| Motion | `--duration`, `--ease` |

Component-specific variables are listed on their component pages.
