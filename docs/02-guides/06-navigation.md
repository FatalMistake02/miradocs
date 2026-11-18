---
title: Navigation
description: Configure the sidebar and page outline.
---
## Sidebar from folders

Each content folder becomes a collapsible sidebar group. Child pages and nested groups are indented. The current page's parent groups open automatically.

Numeric filename prefixes set the default order. Page frontmatter `order` overrides that order. Set `sidebar: false` to remove a page from the sidebar and pagination.

## Custom sidebar

Set `sidebar` to an array:

```json
{
  "sidebar": [
    { "page": "01-getting-started/01-quick-start.md", "label": "Installation" },
    {
      "label": "Guides",
      "collapsed": true,
      "items": [{ "page": "guides/theming" }]
    },
    { "label": "Source", "link": "https://github.com" }
  ]
}
```

A `page` value can be a source filename relative to the locale folder or its generated route. A group contains an `items` array. Groups can be nested. `collapsed: true` closes a group unless it contains the current page.

A `link` value creates an ordinary URL link. Every link needs a label. Invalid page references fail the build. A locale's `sidebar` setting replaces the global sidebar for that language.

## Page outline

The outline lists headings from level two through level six. Each level is indented under the previous level. The page title is excluded. It remains pinned during article scrolling, and the current section is marked as you scroll.

At smaller widths, the outline moves above the article into a disclosure. Landing pages omit both the sidebar and outline.
