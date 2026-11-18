---
title: File trees
description: Format a nested list as a directory structure.
---
## Example

:::file-tree
- docs/
  - index.md
  - 01-guides/
    - 01-install.md
- theme/
  - tokens.css
- miradocs.config.json
:::

## Usage

Write a nested Markdown list inside `file-tree`. Indentation determines the hierarchy.

```md
:::file-tree
- docs/
  - index.md
- theme/
  - tokens.css
:::
```

File trees are display content. The component does not read the filesystem or create files.

## Customize

The wrapper uses `.file-tree`. Lists and items retain their normal Markdown structure.

```css
.file-tree {
  background: var(--code-bg);
  font-family: var(--mono);
  padding: 12px 22px;
}
.file-tree ul { padding-inline-start: 24px; }
```
