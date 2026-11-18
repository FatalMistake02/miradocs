---
title: Callouts
description: Highlight contextual information with a title and body.
---
## Examples

:::note Note
Provide supporting information that applies to this section.
:::
:::tip Tip
Suggest an optional improvement or a shorter procedure.
:::
:::caution Caution
Explain a consequence the reader should consider before continuing.
:::
:::danger Danger
Identify a destructive action or a serious failure condition.
:::

## Usage

Choose `note`, `tip`, `caution`, or `danger`. The title is optional. Without a title, the component uses a translated default label.

```md
:::note Optional title
The body supports **Markdown**, links, and other components.
:::
```

## Customize

All variants use `.callout` and `.callout-title`. The variant name is an additional class. The local `--callout-color` property controls the border and icon.

```css
.callout { border-radius: 12px; padding: 20px; }
.callout.note { --callout-color: var(--info); }
.callout.caution { --callout-color: var(--warning); }
.callout.danger { --callout-color: var(--danger); }
.callout-title { font-size: 14px; }
```

Use the shared color tokens for palettes that work in both light and dark modes. The Lucide icon and text label distinguish variants in addition to color.
