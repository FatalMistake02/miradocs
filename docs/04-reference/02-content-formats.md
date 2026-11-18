---
title: Content formats
description: Page syntax and the roles of Markdown, YAML, HTML, JSON, CSS, and JavaScript.
---
## Files in a project

| Format | Used for | Example location |
| --- | --- | --- |
| Markdown | Page content | `docs/01-guides/01-installation.md` |
| YAML | Frontmatter at the start of a page | Inside the `.md` file |
| JSON | Site configuration | `miradocs.config.json` |
| HTML | Reusable component templates | `components/example.html` |
| CSS | Theme and component styles | `theme/custom.css` |
| JavaScript | Optional client-side behavior | `public/example.js` |

Page files use the `.md` extension. MDX, JSX, AsciiDoc, and reStructuredText are not page input formats. Custom content structures can be built with [HTML component templates](/components/custom-components/).

## Markdown support

miradocs uses markdown-it with CommonMark syntax, plus tables, strikethrough, automatic URL links, task lists, and footnotes. Fenced code blocks add syntax highlighting and a copy control. The miradocs component directives are an additional extension.

Use the [CommonMark tutorial](https://commonmark.org/help/tutorial/) to learn the core syntax and the [Markdown Guide](https://www.markdownguide.org/) as a reference. The [markdown-it demo](https://markdown-it.github.io/) is useful for trying ordinary Markdown; miradocs directives and its additional plugins are specific to this site generator. Features described by another Markdown tool may use different syntax or require plugins that miradocs does not include.

## YAML frontmatter

Put frontmatter between `---` lines at the beginning of the file. The body below it is Markdown.

```md title=docs/example.md
---
title: "A title: with punctuation"
description: A description for the page.
draft: false
---

## First section

Write the page content here.
```

Quote strings containing a colon followed by a space. Use `true` and `false` for boolean options. The available fields are listed in [Page metadata](/getting-started/project-structure/#page-metadata).

## HTML in Markdown

HTML is disabled by default. Enable it for trusted page authors by adding this setting to `miradocs.config.json`:

```json title=miradocs.config.json
{
  "markdown": { "html": true }
}
```

Then a page can contain HTML such as:

```md title=docs/keyboard-shortcuts.md
---
title: Keyboard shortcuts
---

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search.
```

Use a template when the same markup will appear on several pages. Template HTML is enabled independently of the Markdown raw-HTML setting.

## Documenting code and configuration

A fenced block displays its content as code. It does not execute JavaScript, apply CSS, change configuration, or render HTML. The language label selects syntax highlighting; it does not enable another page format.

For example, this belongs inside a Markdown page and displays a JSON sample:

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````

See [Code blocks](/components/code-blocks/) for labels and [Custom components](/components/custom-components/) for working HTML, CSS, and JavaScript examples.
