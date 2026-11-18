---
title: Tabs
description: Group related content into selectable panels.
---
## Example

:::tabs
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
:::tab Bun
```sh
bun run build
```
:::
:::

## Usage

Nest `tab` directives inside `tabs`. Each tab needs a label and a closing fence. The first tab is selected initially.

```md
:::tabs
:::tab npm
Run the npm command.
:::
:::tab pnpm
Run the pnpm command.
:::
:::
```

Use an optional title after `:::tabs` to name the tab group for assistive technology. Panels can contain Markdown and other components.

## Keyboard behavior

Tab moves focus to the selected tab. Left and Right select adjacent tabs; Home and End select the first and last tabs. Tab then moves into the selected panel. Other panels are hidden after initialization.

## Customize

The group uses `.tabs`, the row uses `.tab-list`, and each panel uses `.tab-panel`. Selection is exposed through `aria-selected`.

```css
.tabs { border-radius: 16px; }
.tab-list { gap: 28px; background: var(--surface); }
.tab-list button[aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
.tab-panel { padding: 12px 24px; }
```
