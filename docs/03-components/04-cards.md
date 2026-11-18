---
title: Cards
description: Display related pages or content in a grid.
---
## Example

:::cards
:::card Installation | /getting-started/quick-start/
Install the dependencies and start the preview.
:::
:::card Theming | /guides/theming/
Override shared tokens or add custom CSS.
:::
:::

## Usage

Use `cards` for the grid and `card` for each item. Separate a title from its optional URL with ` | `.

```md
:::cards
:::card Installation | /getting-started/quick-start/
Install the dependencies and start the preview.
:::
:::card A card without a link
This card contains supporting content.
:::
:::
```

Cards support Markdown in the body. Linked cards have a stretched title link, so the card surface is clickable. Links in the body remain independently usable.

## Customize

The container uses `.cards`; individual cards use `.content-card`. The default grid has two columns in documentation pages, three in landing pages, and one on narrow screens.

```css
.cards { gap: 20px; }
.content-card { padding: 28px; border-radius: 16px; }
.content-card strong { font-size: 17px; }
.content-card p { color: var(--muted); }
@media (min-width: 900px) {
  .cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

A `components/card.html` template replaces the built-in card renderer. Use that when changing the markup rather than its appearance.
