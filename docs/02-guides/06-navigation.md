---
title: Navigation
description: Arrange your pages in the sidebar and organize the page outline.
---
## Use folders for the sidebar

Each folder in `docs/` becomes a sidebar group. Nested folders create nested groups. Numbered prefixes set the default order without appearing in labels or URLs.

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::

Set a page's `title` in frontmatter to choose its sidebar label. Use `order` to sort a page before filename ordering, or `sidebar: false` to leave it out of the sidebar and previous/next links.

## Set a custom sidebar

Add a `sidebar` array when you want to choose the labels, groups, and order yourself:

```json title=miradocs.config.json
{
  "sidebar": [
    {
      "label": "Guides",
      "items": [
        { "page": "guides/installation" },
        { "page": "guides/configuration" }
      ]
    },
    {
      "label": "Reference",
      "collapsed": true,
      "items": [{ "page": "reference" }]
    },
    { "label": "GitHub", "link": "https://github.com" }
  ]
}
```

### Page links

Use a page's route or its source filename, relative to the language's content folder. For example, `guides/installation` and `01-guides/01-installation.md` refer to the same page.

The page title supplies the label. Add `label` to override it in the sidebar.

### Groups and external links

A group needs a `label` and an `items` array. Groups can contain other groups. Set `collapsed: true` to start a group closed; it still opens when it contains the current page.

Use `link` and `label` for an external URL. The order of the array becomes the sidebar order.

For a translated sidebar, set `sidebar` inside the relevant [locale](/guides/localization/).

## Page outline

The outline uses headings from `##` through `######`. The page title is separate and is not included.

Use heading levels to group related sections:

```md
## Installation

### Windows

### Linux

## Configuration
```

Keep levels in order. Use a larger heading for a main section and the next level down for its subsections.
