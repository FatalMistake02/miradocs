---
title: Project structure
description: Keep content, theme overrides, and reusable components in separate folders.
---
:::file-tree
- miradocs.config.json
- docs/
  - index.md
  - 01-guides/
    - 01-install.md
- theme/
  - tokens.css
  - custom.css
- components/
- public/
- site/ — generated output
:::

## Files and URLs

Numeric prefixes control ordering and are removed from URLs. `docs/01-guides/01-install.md` becomes `/guides/install/`. An `index.md` page uses its folder's URL. Frontmatter `title` controls its navigation label.

## Page metadata

```yaml
---
title: Installation
description: Install and configure the project.
order: 1
sidebar: true
search: true
draft: false
layout: docs
---
```

Use `order` to override file order, `sidebar: false` to hide a page from navigation and pagination, and `search: false` to omit it from search. Drafts appear in development and are excluded from production builds. Use `layout: landing` for a page without sidebars.

:::caution Output belongs to the generator
Builds replace the generated output. miradocs only replaces an empty folder or an output folder carrying its marker file. Keep source files elsewhere.
:::
