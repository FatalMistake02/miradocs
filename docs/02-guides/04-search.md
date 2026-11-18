---
title: Search
description: Search documentation locally with keyboard navigation and typo tolerance.
---
## Open search

Use Ctrl K on Windows or Linux and Command K on Apple devices. The header displays the shortcut for the current platform. Arrow keys select results, Enter opens one, and Escape closes search and restores focus.

## Index and ranking

Each language has its own generated index. Search loads that index and the fuzzy search library when first opened. Titles and descriptions rank above body text. No external search service is required.

## Configuration

```json
{
  "search": { "limit": 10, "threshold": 0.35 }
}
```

A smaller threshold requires closer matches. Set `search: false` to disable search site-wide. Use page frontmatter `search: false` to exclude a page. Search text and error states can be translated through locale `ui` settings. The interface uses the shared theme tokens.
