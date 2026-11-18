---
title: Navigation
description: Configure the sidebar and page outline.
---
## Sidebar from folders

Each content folder becomes a sidebar group. Use nested folders to create nested groups.

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

Headings from level two through level six become outline links. The page title is excluded. Use Markdown heading levels to define the outline hierarchy.
