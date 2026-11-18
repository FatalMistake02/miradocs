---
title: Writing content
description: Write pages in Markdown, including tables, images, lists, and code.
---
## Markdown

miradocs uses markdown-it with CommonMark syntax, tables, link detection, and typography. Use headings, nested lists, links, images, blockquotes, tables, and fenced code blocks. Raw HTML in Markdown is disabled; use trusted custom components for custom markup.

```md
## A heading

![Diagram](/diagram.png)

| Feature | Status |
| --- | --- |
| Search | Included |
```

Put static images and other files in `public/` to copy them to the site root. For sites hosted under a subpath, include that prefix in root-relative content links.

## Callouts

Use `note`, `tip`, `caution`, or `danger` directives:

```md
:::note Optional title
This is a note.
:::
```

:::note Optional title
This is a note.
:::

## Code

Fenced code blocks support syntax highlighting when the language is known, and include a copy button. Unknown languages are displayed as plain text.
