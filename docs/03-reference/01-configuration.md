---
title: Configuration
description: The small set of options that shape your documentation site.
---
## Site settings

Settings live in `miradocs.config.json`. Paths are relative to the configuration file.

```json
{
  "title": "My Docs",
  "language": "en",
  "base": "/",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "components": "components",
  "styles": ["tokens.css", "custom.css"],
  "links": [{"label": "GitHub", "url": "https://github.com", "icon": "github"}]
}
```

`title` changes the site name. `language` sets the HTML language attribute; the built-in interface text is currently English. `base` is the URL prefix. `links` adds links to the header. Set `icon` to a Simple Icons brand name such as `github`, a Lucide icon name such as `book-open`, or `custom:/icon.svg` for an image in your public folder.

`content`, `output`, `theme`, and `components` choose folders. `styles` lists CSS files within the theme folder, in load order. The optional `public` setting defaults to `public` and copies static files into the output root.

## Command line

Use `npm run build` to build or `npm run dev` to build and preview. Both accept `--config`; the preview also accepts `--port`.

