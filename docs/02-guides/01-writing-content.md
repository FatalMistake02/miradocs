---
title: Writing content
description: Add pages, headings, links, images, and components.
---
Pages are Markdown files in `docs/`. If you are new to Markdown, start with the [CommonMark tutorial](https://commonmark.org/help/tutorial/). Keep the [Markdown Guide](https://www.markdownguide.org/basic-syntax/) handy as a syntax reference.

## Create a page

Add a Markdown file with a title and some content:

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

```sh
npm install
npm run dev
```

:::note Production build
Run `npm run build` to generate the finished site.
:::
````

This page appears at `/guides/installation/`. The title is rendered for you, so start the body with a level-two heading (`##`). Frontmatter goes between the `---` lines; see [Page metadata](/reference/page-metadata/) for more options.

### Organize headings

Use `##` for a major section and `###` for a topic within it. Keep related subsections under the same parent heading. The [page outline](/guides/navigation/#page-outline) follows that hierarchy.

## Add links and images

### Links

Link to a page using its source path or its URL:

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

Source paths are relative to the file you are writing. Links ending in `.md` are converted to page URLs. Root-relative URLs, such as `/reference/configuration/`, use your configured `base` path.

Missing internal pages, images, and heading fragments fail the build by default. This helps catch links that need updating when you move content.

### Images and downloads

Put images and downloadable files in `public/`. Reference them without the `public/` prefix:

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```

Write alternative text that explains what the image shows.

## Add components

Use a directive to place a component in Markdown:

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::

Put the opening directive, content, and closing `:::` on separate lines. See [Using components](/components/) for the available components, examples, and styling options.

## Other markup

Markdown supports tables, task lists, footnotes, and highlighted code blocks. See [Content formats](/reference/content-formats/) for the supported syntax.

For custom markup, use an [HTML template](/components/custom-components/) or a [framework component](/components/framework-components/). Raw HTML in a page is available when you enable `markdown.html` in configuration.
