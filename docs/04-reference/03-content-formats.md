---
title: Content formats
description: Markdown syntax and the other files used by a miradocs project.
---
## Project files

| Format | Use | Example |
| --- | --- | --- |
| Markdown | Page content | `docs/guides/installation.md` |
| YAML | Page metadata | Frontmatter inside a `.md` file |
| JSON | Site configuration | `miradocs.config.json` |
| HTML | Reusable templates | `components/example.html` |
| CSS | Theme and component styles | `theme/components.css` |
| JavaScript | Optional page behavior | `public/example.js` |

Pages use `.md` files. To include JSX, TSX, Vue, or Svelte, register a [framework component](/components/framework-components/) and use it inside Markdown. MDX, AsciiDoc, and reStructuredText are not page input formats.

## Markdown

miradocs supports CommonMark syntax and these additions:

- Tables and strikethrough.
- Automatic links for URLs.
- Task lists and footnotes.
- Fenced code blocks with syntax highlighting.
- Component directives such as `:::note`.

Learn the basics with the [CommonMark tutorial](https://commonmark.org/help/tutorial/). The [Markdown Guide](https://www.markdownguide.org/extended-syntax/) covers the extended syntax. For complete page files, see [Page examples](/guides/page-examples/).

## Page metadata

Put YAML frontmatter at the start of a page:

```md title=docs/example.md
---
title: "Install: Windows"
description: Set up the project on Windows.
draft: false
---

## Requirements

Write the page content here.
```

Quote values containing a colon followed by a space. Use `true` and `false` for boolean fields. See [Page metadata](/reference/page-metadata/) for all options.

## HTML

Use an [HTML component template](/components/custom-components/) for markup you want to reuse. To write raw HTML directly in Markdown, enable it in configuration:

```json title=miradocs.config.json
{
  "markdown": { "html": true }
}
```

You can then write markup in a page, such as:

```md
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.
```

Enable raw HTML only for content authors you trust. HTML templates work independently of this setting.

## Code examples

Code fences display their contents instead of rendering or running them. Put the language after the opening fence to select syntax highlighting:

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````

See [Code blocks](/components/code-blocks/) for labels and styling.
