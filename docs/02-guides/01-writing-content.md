---
title: Writing content
description: Create a Markdown page and add it to your site.
---
## Markdown references

For Markdown syntax, use the [CommonMark interactive tutorial](https://commonmark.org/help/tutorial/) or the [Markdown Guide basic syntax reference](https://www.markdownguide.org/basic-syntax/). The [extended syntax reference](https://www.markdownguide.org/extended-syntax/) covers tables, task lists, and footnotes. See [Content formats](/reference/content-formats/) for the extensions enabled in miradocs.

The rest of this guide covers what to put in your files and how miradocs uses them.

## Create a page

Save this as `docs/01-guides/01-installation.md`:

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or later
- A copy of the project repository

## Install dependencies

Run these commands from the project directory:

```sh
npm ci
npm run dev
```

:::note Production build
Run `npm run build` to generate the static site.
:::

## Next steps

Add another Markdown page to the same folder.
````

The page appears at `/guides/installation/`. Its frontmatter supplies the title and description; start the body with `##` because the page title is rendered automatically. Replace the sample instructions with your project's own setup steps.

Use [Page examples](/guides/page-examples/) for complete landing, guide, and reference files. See [Page metadata](/getting-started/project-structure/#page-metadata) for optional frontmatter fields.

## Add a component

Components are Markdown directives. Place the opening directive, body, and closing fence on separate lines:

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::

The [Components reference](/components/) has the source, rendered result, and customization options for each component. Directives such as `:::note` are miradocs syntax rather than standard Markdown.

## Link to another page

Use a source path relative to the current file, or a route relative to the site root:

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[External guide](https://commonmark.org/help/tutorial/)
```

miradocs resolves links ending in `.md` to the generated URL. Root-relative links receive the configured `base` prefix. A missing internal page or fragment fails the build unless `strictLinks` is disabled.

## Add an image

Put the image in `public/` and reference its public URL. For example, `public/images/setup.png` is used like this:

```md
![The setup screen](/images/setup.png)
```

Keep the alternative text descriptive. You can use the same public folder for downloadable files.

## Use HTML or other markup

Use [HTML templates](/components/custom-components/) for reusable custom markup. Inline HTML in a page requires `markdown.html: true`. YAML frontmatter, HTML, and the other file formats used by a project are covered in [Content formats](/reference/content-formats/).
