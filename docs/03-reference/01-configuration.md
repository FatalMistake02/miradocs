---
title: Configuration
description: Site settings, file paths, and commands.
---
## Site settings

Configuration lives in `miradocs.config.json`. Paths resolve relative to that file.

```json
{
  "title": "Project docs",
  "site": "https://docs.example.com",
  "base": "/",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "components": "components",
  "public": "public",
  "styles": ["tokens.css", "custom.css"],
  "links": [{"label": "GitHub", "url": "https://github.com", "icon": "github"}],
  "search": {"limit": 10, "threshold": 0.35},
  "language": "en"
}
```

Other settings include `sidebar`, `locales`, `logo`, `favicon`, `footer`, `editUrl`, and `markdown.html`. Output must be a separate directory inside the project. Source directories cannot overlap output.

## Icons

Interface icons use Lucide. Link icons accept a Simple Icons slug such as `github` or `discord`, a Lucide name such as `book-open`, or `custom:/my-icon.svg` for a public image. Unknown names fail with a useful error. Set `newTab: true` on a header link to open it in another tab.

## Commands

| Command | Behavior |
| --- | --- |
| `miradocs init [directory]` | Create a new documentation project |
| `miradocs dev` | Build, watch, and live reload |
| `miradocs build` | Build production output |
| `miradocs serve` | Build and preview without watching |

Use `--config path` to select a config and `--port number` to select a preview port. From this checkout, replace `miradocs` with `node bin/miradocs.js`.

## Validation and extensions

Set `strictLinks: false` to opt out of internal link and fragment checking. By default, missing pages and assets fail the build. Add `scripts` as an array of public module-script URLs to initialize custom interactive components. The `miradocs.schema.json` file provides editor completion and validation through a `$schema` reference.
