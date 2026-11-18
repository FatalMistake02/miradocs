---
title: Project structure
description: A familiar folder structure that keeps content, presentation, and output easy to find.
---
## Everything in its place

```text
miradocs.config.json             Site settings
docs/                 Markdown content
  index.md            Home page
  01-getting-started/ A navigation group
theme/                Your tokens and custom CSS
components/           Reusable HTML templates
public/               Optional static files
src/                  Generator
assets/               Default styles and scripts
site/                 Generated output
```

Each subfolder becomes a navigation group. Files are sorted by their full path; use prefixes like `01-` and `02-` to choose their order. A page's `title` frontmatter controls its label. The generated URL comes from the file path, with numeric prefixes removed.

## Page metadata

Put a small frontmatter block at the top of each page:

```md
---
title: Your page title
description: A short introduction to this page.
---
```

Descriptions appear below the title, in search results, and in the page's metadata. The `index.md` file in any folder becomes that folder's URL.

:::caution Keep output separate
The output directory is rebuilt from scratch. Don't put your source files or anything you want to keep there.
:::

