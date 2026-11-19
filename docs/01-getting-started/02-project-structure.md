---
title: Project structure
description: Where to put pages, styles, components, and public files.
---
The starter includes `docs/`, `theme/`, and a configuration file. Add the other folders when you need them.

:::file-tree Project
- docs/ — Markdown pages
  - index.md
  - 01-guides/
    - 01-installation.md
- theme/ — your styles
  - tokens.css
  - components.css
- components/ — reusable components
- public/ — images, fonts, and downloads
- miradocs.config.json
- package.json
- site/ — generated output
:::

## Pages and URLs

Each Markdown file becomes a page. An `index.md` file uses its folder's URL. Numbered prefixes control the default order and are left out of URLs.

| File | URL |
| --- | --- |
| `docs/index.md` | `/` |
| `docs/01-guides/index.md` | `/guides/` |
| `docs/01-guides/01-installation.md` | `/guides/installation/` |

Set the page's `title` in frontmatter to choose its heading and sidebar label. See [Page metadata](/reference/page-metadata/) for the available fields, and [Navigation](/guides/navigation/) for sidebar ordering.

## Styles and components

Put your CSS in `theme/` and list the files in the configuration's `styles` array. You can change shared variables or style one component. See [Theming](/guides/theming/).

Use `components/` for [HTML templates](/components/custom-components/) and [framework components](/components/framework-components/).

## Public files

Files in `public/` are copied into the site's root. For example, `public/images/logo.svg` is available at `/images/logo.svg`.

Keep source files out of `site/`. Builds replace that directory.
