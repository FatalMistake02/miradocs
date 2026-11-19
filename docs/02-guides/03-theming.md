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

Append `{.class-name}` to a component's opening line to give that instance a class. You can add more than one class, such as `{.hero-button .wide}`.

```md title=docs/index.md
:::button Get started | /getting-started/quick-start/ {.hero-button}
:::
```

```css title=theme/components.css
.hero-button {
  background: var(--accent-gradient);
  color: white;
  border: 0;
}
```

The same suffix works for tabs, callouts, file trees, custom templates, and framework component containers. Targeting `.action-button` styles every button; targeting `.hero-button` styles only instances with that class.

## Semantic roles

| Role | Tokens |
| --- | --- |
| Surfaces | `--bg`, `--surface`, `--surface-raised`, `--hover`, `--selected` |
| Text | `--text`, `--muted`, `--accent`, `--accent-text` |
| Structure | `--border`, `--radius`, `--panel-radius`, `--header-height` |
| Layout | `--sidebar-width`, `--outline-width`, `--content-width` |
| Type | `--font`, `--mono`, `--brand-font-weight` |
| Code | `--code-bg`, `--code-text`, `--code-keyword`, `--code-string`, `--code-number`, `--code-comment` |
| Feedback | `--info`, `--warning`, `--danger` |
| Motion | `--duration`, `--ease` |

## Site identity

Set `title`, `logo`, `favicon`, and optional `footer` in configuration. Asset paths refer to files in the public folder.

The header title uses regular weight (`400`) by default. Override `--brand-font-weight` in your theme to change it:

```css
:root {
  --brand-font-weight: 500;
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
