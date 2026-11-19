---
title: Theming
description: Override semantic tokens, then add CSS for more detailed changes.
---
## Shared layout, separate palettes

The default theme is neutral. Both color modes use the same layout. Put overrides in your theme folder and list the CSS files in `styles`. They load after the default stylesheet in the configured order.

```css
:root {
  --radius: 8px;
  --sidebar-width: 248px;
  --content-width: 780px;
}
html[data-theme="dark"] {
  --bg: #141414;
  --text: #e8e8e8;
}
```

For a custom system-dark palette, add the same color overrides under `@media (prefers-color-scheme: dark)` with `html:not([data-theme=light]):not([data-theme=dark])`. The explicit and system palettes are independent of layout.

## Fonts

Set `--font` for the interface and article text, and `--mono` for code. Put these overrides in `theme/tokens.css`:

```css title=theme/tokens.css
:root {
  --font: "Segoe UI", system-ui, sans-serif;
  --mono: "Cascadia Code", ui-monospace, monospace;
}
```

To use your own font, add its file to `public/fonts/` and load it from your theme stylesheet. This example uses a variable WOFF2 font:

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

## Component styles

Edit your own stylesheets under `theme/`. List them in configuration so they load after the default CSS:

```json title=miradocs.config.json
{
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```

Target a component's class to change just that component, or set its variables locally:

```css title=theme/components.css
.tabs {
  border-radius: 16px;
}
.callout {
  padding: 20px 24px;
}
.file-tree {
  --tree-row-height: 36px;
  --tree-icon: var(--accent);
}
```

Each [component page](/components/) lists its selectors and customization examples. For different markup, add a [custom component template](/components/custom-components/). Keep your changes in source files; `site/` is replaced on each build.

### Style one instance

Append `{.class-name}` to any component's opening line to give that instance a class. You can add more than one class, such as `{.install-tabs .wide}`. Classes work on built-in components, your HTML templates, and framework component containers.

```md title=docs/index.md
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

Each selector above affects only the named instance. A descendant selector such as `.install-tabs .tab-list` targets part of that instance. The component's default classes remain available alongside your own.

### Style ordinary Markdown

Wrap any Markdown in a [group](/components/groups/) to scope styles to its headings, paragraphs, links, images, tables, code blocks, or nested components:

```md
:::group {.installation-section}
## Installation

Read the [setup guide](/getting-started/quick-start/).
:::
```

```css title=theme/components.css
.installation-section h2 { font-weight: 500; }
.installation-section a { text-decoration-color: var(--accent); }
```

For framework components, the instance class is attached to the mount container. Style its exposed elements or pass CSS variables and props; scoped framework styles and shadow DOM keep their own styling boundaries.

## Semantic roles

| Role | Tokens |
| --- | --- |
| Surfaces | `--bg`, `--surface`, `--surface-raised`, `--hover`, `--selected` |
| Text | `--text`, `--muted`, `--accent`, `--accent-text` |
| Structure | `--border`, `--radius`, `--panel-radius`, `--header-height` |
| Layout | `--sidebar-width`, `--outline-width`, `--content-width` |
| Type | `--font`, `--mono`, `--brand-font-weight`, `--brand-font-size` |
| Code | `--code-bg`, `--code-text`, `--code-keyword`, `--code-string`, `--code-number`, `--code-comment` |
| Feedback | `--info`, `--warning`, `--danger` |
| Motion | `--duration`, `--ease` |

## Site identity

Set `title`, `logo`, `favicon`, and optional `footer` in configuration. Asset paths refer to files in the public folder.

The header title uses regular weight (`400`) and an `18px` font size by default. Override `--brand-font-weight` and `--brand-font-size` in your theme to change them:

```css
:root {
  --brand-font-weight: 500;
  --brand-font-size: 20px;
}
```

## Header accent

Set `--accent-gradient` to a CSS gradient and `--header-divider` to use it for the header border. Set `--header-divider: var(--border)` for a solid line.

```css
:root {
  --accent-gradient: linear-gradient(110deg, #ff0951b8, #f50983);
  --header-divider: var(--accent-gradient);
}
```
