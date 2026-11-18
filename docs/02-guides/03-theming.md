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

## Semantic roles

| Role | Tokens |
| --- | --- |
| Surfaces | `--bg`, `--surface`, `--surface-raised`, `--hover`, `--selected` |
| Text | `--text`, `--muted`, `--accent`, `--accent-text` |
| Structure | `--border`, `--radius`, `--panel-radius`, `--header-height` |
| Layout | `--sidebar-width`, `--outline-width`, `--content-width` |
| Type | `--font`, `--mono` |
| Code | `--code-bg`, `--code-text`, `--code-keyword`, `--code-string`, `--code-number`, `--code-comment` |
| Feedback | `--info`, `--warning`, `--danger` |
| Motion | `--duration`, `--ease` |

## Site identity

Set `title`, `logo`, `favicon`, and optional `footer` in configuration. Asset paths refer to files in the public folder.

## Header accent

Set `--accent-gradient` to a CSS gradient and `--header-divider` to use it for the header border. Set `--header-divider: var(--border)` for a solid line.

```css
:root {
  --accent-gradient: linear-gradient(110deg, #ff0951b8, #f50983);
  --header-divider: var(--accent-gradient);
}
```
