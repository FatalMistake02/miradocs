---
title: Badges
description: Display a short status or category label.
---
## Example

:::badge Stable
:::

## Usage

Put a short label after the directive name and leave the body empty.

```md
:::badge Stable
:::
```

Badges are block directives rendered as compact inline-block elements. They do not accept Markdown inside the label.

## Customize

Use the `.badge` selector. Keep text contrast readable in both themes.

```css
.badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
