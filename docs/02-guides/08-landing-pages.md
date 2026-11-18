---
title: Landing pages
description: Use the same content system for pages without documentation sidebars.
---
## Page layout

Add `layout: landing` to frontmatter. The header stays available, while navigation and the page outline are omitted. Use `sidebar: false` to exclude the page from documentation navigation.

```yaml
---
title: Your project
description: A concise explanation of what it does.
layout: landing
sidebar: false
---
```

## Content

Use ordinary Markdown, action links, and card grids. Landing pages get a wider content area and larger introductory type; all theme tokens still apply. The [home page](/) is an example built entirely from Markdown and frontmatter.
