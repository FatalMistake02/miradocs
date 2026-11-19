---
title: Code blocks
description: Show code with syntax highlighting, a filename, and a copy button.
---
## Example

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```

## Add a code block

Put a language after the opening code fence. Add `title=filename` to show a filename above the code:

````md
```js title=example.js
const options = { theme: 'system' };
```
````

Recognized languages receive syntax highlighting. Other language labels display plain code.

## Customize

Use `.code-block` for the container, `.code-top` for its header, and `.copy-code` for the copy button:

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```

Change the palette with `--code-bg`, `--code-text`, `--code-keyword`, `--code-string`, `--code-number`, and `--code-comment`.

To style one code example, wrap its fence in a [content group](/components/content-groups/) and target that group's `.code-block`.
