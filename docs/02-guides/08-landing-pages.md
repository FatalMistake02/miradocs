---
title: Landing pages
description: Create a home page without documentation sidebars.
---
## Set the layout

Add `layout: landing` to the page's frontmatter. Set `sidebar: false` to keep the landing page out of documentation navigation.

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```

Replace the sample links with pages that exist in your project.

## Add content

Landing pages support the same Markdown and components as documentation pages. Use [buttons](/components/buttons/), [cards](/components/cards/), or your own components to guide readers to the next page.

## Change the appearance

Landing pages use the same theme variables, with a wider content area and a larger page title. Target `.landing-layout` in your theme CSS for changes limited to these pages:

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```

For a custom section within the page, add a class to a component or wrap the content in a [content group](/components/content-groups/).
