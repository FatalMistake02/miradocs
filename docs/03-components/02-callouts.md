---
title: Callouts
description: Add a note, tip, caution, or warning to a page.
---
## Examples

:::note
Your theme styles load after the default CSS.
:::
:::tip
Add a class to style one component without changing the others.
:::
:::caution
Changes made directly in `site/` are replaced by the next build.
:::
:::danger
Deleting your source folder removes the pages used to build the site.
:::

## Add a callout

Choose `note`, `tip`, `caution`, or `danger`. Add an optional title after the directive name:

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```

Leave the title out to use the default label for the current language. The body supports Markdown and other components.

## Customize

Use `--callout-color` to change the border and icon color for one instance:

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```

All callouts use `.callout` and `.callout-title`. The variant is also a class, such as `.callout.caution`.
