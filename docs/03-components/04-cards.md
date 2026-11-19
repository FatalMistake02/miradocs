---
title: Cards
description: Link to related pages or group short pieces of content.
---
## Example

:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /guides/theming/
Change fonts, colors, and component styles.
:::
:::

## Add cards

Wrap `card` directives in `cards` to create a grid. Separate a card's title and optional URL with ` | `.

```md
:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card A card without a link
Add supporting content here.
:::
:::
```

Card bodies support Markdown. A linked card is clickable across its surface; links inside the body still open their own destinations.

## Customize

The grid uses `.cards`, and each card uses `.content-card`. By default, grids have two columns on documentation pages, three on landing pages, and one on small screens.

```css title=theme/components.css
.guide-cards { gap: 20px; }
.guide-cards .content-card {
  padding: 24px;
  border-radius: 12px;
}
@media (min-width: 900px) {
  .guide-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Add a class to a `card` directive to style just that card. For different markup, add a `components/card.html` [template](/components/custom-components/).
