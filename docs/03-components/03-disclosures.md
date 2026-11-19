---
title: Disclosures
description: Keep optional details in an expandable section.
---
## Example

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/guides/theming/).
:::

## Add a disclosure

Use `details` with a title. The content can include paragraphs, lists, code blocks, and other components.

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```

Disclosures start closed. Readers can click the title or focus it and press Enter or Space to toggle the content.

## Customize

Set variables on the instance class:

```css title=theme/components.css
.output-details {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-border: var(--border);
  --details-header-hover: var(--hover);
}
.output-details .details-content { font-size: 14px; }
```

The selectors are `.details`, `.details-title`, `.details-indicator`, and `.details-content`. Use `[open]` to target the expanded state.
