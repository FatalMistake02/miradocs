---
title: Theming
description: Start with a few design tokens, then make the details your own with CSS.
---
## One layout, two palettes

miradocs uses CSS custom properties throughout the shared layout. Override them in `theme/tokens.css` for the light palette and under `html[data-theme="dark"]` for dark mode. The theme button cycles through system, light, and dark preferences, remembering the choice locally.

```css
:root {
  --accent: #404040;
  --accent-soft: #e9e9e9;
  --radius: 10px;
}
html[data-theme="dark"] {
  --accent: #ededed;
  --accent-soft: #303030;
}
```

Also override the system dark media query as shown in the included tokens file. That keeps system preference and explicit dark mode consistent.

## Go deeper

Use `theme/custom.css` for your own selectors and component styles. Stylesheets listed in `miradocs.config.json` load in order after the defaults. You can use another theme folder by changing `theme` in the config.

Useful tokens include `--bg`, `--surface`, `--surface-alt`, `--text`, `--muted`, `--line`, `--accent`, `--accent-soft`, `--code`, `--code-text`, `--radius`, `--font`, and `--mono`.

:::tip Motion that respects readers
The default theme uses small transitions and respects the operating system's reduced-motion preference.
:::

