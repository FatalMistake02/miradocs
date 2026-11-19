---
title: Disclosures
description: Show optional content in an expandable section.
---
## Example

:::details Which files are generated?
The build writes HTML pages, styles, scripts, search indexes, and optional sitemap metadata into the output directory.
:::

:::details Can I change the appearance?
Add a class to this instance and style it in your theme CSS. Its content supports Markdown, including [links](/guides/theming/), lists, and code blocks.
:::

## Usage

The directive title becomes the summary. The body can contain paragraphs, lists, code, and other components.

```md
:::details Which files are generated?
The build writes files into the output directory.
:::
```

Disclosures use native `details` and `summary` elements. They start closed and work without JavaScript. Enter or Space toggles a focused summary.

## Customize

Set the disclosure's variables in your theme CSS. Use `.details` for all disclosures, or add a class to target one:

```md
:::details More information {.extra-info}
Additional content goes here.
:::
```

```css
.extra-info {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-header-hover: var(--hover);
}
.extra-info .details-title { font-weight: 500; }
.extra-info .details-content { font-size: 14px; }
```

The main selectors are `.details`, `.details-title`, `.details-indicator`, and `.details-content`. The `[open]` attribute identifies the expanded state.

