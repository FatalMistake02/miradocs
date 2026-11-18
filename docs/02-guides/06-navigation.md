---
title: Navigation
description: Generate nested navigation from folders or define it explicitly.
---
## Automatic navigation

Folder groups are collapsible. Nested folders create nested groups, and the current page's ancestors remain open. Numeric prefixes and page `order` control ordering. `sidebar: false` hides a page from the sidebar and pagination.

## Explicit navigation

Set `sidebar` to an array of page links, external links, and groups:

```json
{
  "sidebar": [
    { "page": "01-getting-started/01-quick-start.md", "label": "Start here" },
    {
      "label": "Guides", "collapsed": true,
      "items": [{ "page": "guides/theming" }]
    },
    { "label": "Source", "link": "https://github.com" }
  ]
}
```

A page reference can be its source filename relative to the locale folder or its generated route without a leading slash. Invalid page references fail the build. Locale-specific sidebars override the global sidebar.
