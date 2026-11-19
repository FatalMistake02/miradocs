---
title: Badges
description: Add a short status or category label.
---
## Example

:::badge Beta
:::

## Add a badge

Put the label after `badge` and leave the body empty:

```md
:::badge Beta {.release-badge}
:::
```

Labels are plain text. Keep them short, such as “Beta” or “Optional”.

## Customize

Style one instance with its class, or use `.badge` for all badges:

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
