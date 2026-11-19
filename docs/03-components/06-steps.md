---
title: Steps
description: Present instructions as a numbered sequence.
---
## Example

:::steps
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::

## Add steps

Wrap level-three headings (`###`) and their content in `steps`. Each heading becomes the next numbered step.

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
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
