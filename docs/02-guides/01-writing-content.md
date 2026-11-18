---
title: Writing content
description: Use Markdown for headings, tables, images, lists, code, and references.
---
## Markdown syntax

miradocs uses markdown-it for CommonMark with tables, automatic links, task lists, and footnotes. Nested ordered and unordered lists work normally.

| Syntax | Example |
| --- | --- |
| Emphasis | **bold**, *italic*, ~~strikethrough~~ |
| Code | `inline code` |
| Link | [Quick start](/getting-started/quick-start/) |

- [x] Write content
- [x] Preview changes
- [ ] Publish the output

## Links and images

Links to Markdown sources are resolved to generated page URLs. Root-relative links and image paths receive the configured base prefix automatically. Use `../01-getting-started/01-quick-start.md` to link to another source page. Put images in `public/`, then reference `![Alternative text](/diagram.svg)`.

## Code blocks

Fenced code supports language highlighting, a copy button, and an optional title:

```js title=example.js
const message = 'Hello';
console.log(message);
```

Use four backticks around an example that contains triple backticks. Unknown languages are escaped and shown as plain text.

## Footnotes

Use a footnote to keep supporting information out of the main paragraph.[^example]

[^example]: A footnote can contain additional Markdown.

## HTML

Raw HTML is disabled by default. Set `markdown.html` to true for trusted author content. Custom component templates are always trusted project code.
