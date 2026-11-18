---
title: Disclosures
description: Show optional content in an expandable section.
---
## Example

:::details Which files are generated?
The build writes HTML pages, styles, scripts, search indexes, and optional sitemap metadata into the output directory.
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

Target `.details`, `.details summary`, and the open attribute.

```css
.details { border-radius: 12px; background: var(--surface); }
.details summary { padding: 18px 22px; }
.details[open] summary { color: var(--accent); }
.details > div { padding: 4px 22px 16px; }
```

