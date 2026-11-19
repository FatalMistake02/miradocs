---
title: Steps
description: Present instructions as a numbered sequence.
---
## Example

:::steps
### Install dependencies
Run `npm install` in your project.
### Start the preview
Run `npm run dev` and open the address in your terminal.
### Build the site
Run `npm run build` to generate `site/`.
:::

## Add steps

Wrap level-three headings (`###`) and their content in `steps`. Each heading becomes the next numbered step.

```md
:::steps {.setup-steps}
### Install dependencies
Run `npm install` in your project.
### Start the preview
Run `npm run dev`.
### Build the site
Run `npm run build` to generate `site/`.
:::
```

Step headings also appear in the page outline. A new steps block starts numbering from one.

## Customize

Use `.steps` for the block and `.steps h3::before` for its number markers:

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
