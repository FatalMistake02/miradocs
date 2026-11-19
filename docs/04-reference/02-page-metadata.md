---
title: Page metadata
description: Set a page's title, layout, order, and visibility.
---
Add metadata between `---` lines at the start of a Markdown file. The content below it is the page body.

```md title=docs/example.md
---
title: Installation
description: Install the project and start a preview.
layout: docs
order: 1
draft: false
sidebar: true
search: true
---

## Requirements

Write your content here.
```

## Page options

| Field | Default | What it does |
| --- | --- | --- |
| `title` | Filename without its numbered prefix | Sets the page heading, sidebar label, and browser title |
| `description` | Empty | Adds an introduction below the title and a metadata description |
| `layout` | `docs` | Use `landing` to omit the documentation sidebars |
| `order` | `0` | Sets the page's sort order before filename ordering |
| `draft` | `false` | Includes the page in development but leaves it out of production builds |
| `sidebar` | `true` | Set to `false` to exclude the page from the sidebar and previous/next links |
| `search` | `true` | Set to `false` to exclude the page from search results |

Quote values containing a colon followed by a space, such as `title: "Install: Windows"`. Use `true` and `false` for boolean fields.

## Common uses

### Make a landing page

```yaml
---
title: My project
description: What the project does.
layout: landing
sidebar: false
---
```

See [Landing pages](/guides/landing-pages/) for a full example.

### Keep a page as a draft

```yaml
---
title: Upcoming changes
draft: true
---
```

The `dev` script includes drafts in the preview. The `build` script leaves them out. See [Commands](/reference/configuration/#commands) for your package manager.
