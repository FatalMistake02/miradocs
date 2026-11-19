---
title: Tabs
description: Show related examples in separate panels.
---
## Example

:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::

## Add tabs

Put a `tab` directive inside `tabs` for each panel. Give each tab a label and its own closing `:::`.

````md
:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::
````

The first tab starts selected. Panels can contain Markdown and nested components. The optional title after `:::tabs` names the group for assistive technology.

### Keyboard controls

Press Tab to focus the selected tab, then Left or Right to change tabs. Home and End select the first and last tabs. Press Tab again to move into the panel.

## Customize

Use the instance class to change one group:

```css title=theme/components.css
.build-tabs { border-radius: 16px; }
.build-tabs .tab-list { gap: 28px; }
.build-tabs .tab-panel { padding: 12px 24px; }
.build-tabs [role="tab"][aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```

The shared selectors are `.tabs`, `.tab-list`, and `.tab-panel`. See [Theming](/guides/theming/#component-styles) for stylesheet setup.
