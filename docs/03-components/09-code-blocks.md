---
title: Code blocks
description: Display highlighted code with an optional filename and copy control.
---
## Example

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```

## Usage

Use a standard fenced code block. Put the language after the opening fence. Add `title=filename` to replace the language label with a filename.

````md
```js title=example.js
const options = { theme: 'system' };
```
````

Known languages use highlight.js. Unknown language names produce escaped plain text. Copying uses the original code text without syntax markup. The copy control reports success or failure.

## Customize

The wrapper uses `.code-block`, the header uses `.code-top`, and the copy control uses `.copy-code`.

```css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```

Use `--code-bg`, `--code-text`, `--code-keyword`, `--code-string`, `--code-number`, and `--code-comment` to change the palette. Override those tokens separately for dark mode.
