---
title: Writing content
description: Write in a small, readable Markdown dialect and let the structure do the work.
---
## The essentials

Mira supports headings, paragraphs, links, bold and italic text, inline code, fenced code blocks, simple ordered and unordered lists, and blockquotes. Headings at levels two and three appear in the page outline automatically.

```md
## A useful heading

A paragraph with **emphasis**, `code`, and [a link](https://example.com).

- One idea
- Another idea
```

Keep lists flat and use one paragraph per block. Tables, images, nested lists, and raw HTML in Markdown are not currently supported. For richer markup, use a custom component template.

## Callouts

Use a directive to make important information easy to notice. Choose `note`, `tip`, `caution`, or `danger`, and optionally add a title.

```md
:::tip A helpful title
A little context for your reader.
:::
```

:::tip A helpful title
A little context for your reader.
:::

## Code blocks

Use triple backticks and an optional language label. Readers can copy the contents with the button in the corner. Code is displayed as plain text, without syntax highlighting.

## Links and paths

Use ordinary Markdown links. For a site hosted under a subpath, include that subpath in root-relative links, or use relative links where appropriate. External links work as expected.
