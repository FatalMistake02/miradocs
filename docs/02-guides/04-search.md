---
title: Search
description: Configure search results and choose which pages are included.
---
Search works with your generated pages and does not need an external service. Each language has its own index.

## Use search

Open search from the header, or press **Ctrl K** on Windows and Linux or **Command K** on macOS. Use the arrow keys to select a result, Enter to open it, and Escape to close search.

Titles and descriptions carry more weight than body text when ranking results.

## Configure results

Add search options to your configuration:

```json title=miradocs.config.json
{
  "search": {
    "limit": 10,
    "threshold": 0.35
  }
}
```

`limit` sets the maximum number of results. A lower `threshold` requires a closer match; a higher value allows more variation in spelling.

### Exclude a page

Set `search: false` in the page's frontmatter:

```yaml
---
title: Internal notes
search: false
---
```

### Disable search

Set `"search": false` in `miradocs.config.json` to remove search from the site.

## Customize search

Search uses the shared [theme variables](/guides/theming/). For specific CSS changes, target `.search-dialog`, `.search-input-wrap`, or `.search-result` in your theme stylesheet.

Translate the interface through a locale's `ui` settings. See [Localization](/guides/localization/).
