---
title: Configuration
description: The small set of options that shape your documentation site.
---
## Site settings

Settings live in `mira.json`. Paths are relative to the configuration file.

```json
{
  "title": "My Docs",
  "label": "DOCUMENTATION",
  "eyebrow": "THE DOCUMENTATION",
  "language": "en",
  "base": "/",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "components": "components",
  "styles": ["tokens.css", "custom.css"],
  "links": [{"label": "GitHub ↗", "url": "https://github.com"}]
}
```

`title`, `label`, and `eyebrow` change the site identity. `language` sets the HTML language attribute; the built-in interface text is currently English. `base` is the URL prefix. `links` adds links to the header.

`content`, `output`, `theme`, and `components` choose folders. `styles` lists CSS files within the theme folder, in load order. The optional `public` setting defaults to `public` and copies static files into the output root.

## Command line

Use `python -m miradocs build` to build or `python -m miradocs serve` to build and preview. Both accept `--config`; the preview also accepts `--port`.
