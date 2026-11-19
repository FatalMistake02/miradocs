---
title: Content groups
description: Style a section of Markdown without changing the rest of the page.
---
A content group adds a plain container around Markdown or nested components. Use it to style a section, a particular heading, or a single image.

## Add a group

Give the group a class and put the content inside:

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [Installation guide](/getting-started/installation/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

Groups have no default visual treatment. Add your styles in a [theme stylesheet](/guides/theming/#add-your-styles):

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```

## Example

:::group {.group-example}
### A grouped section

This paragraph and its [link](/guides/theming/) share one container.
:::

## Style one element

Wrap just the element you want to change:

```md
:::group {.diagram}
![Architecture](/images/architecture.svg)
:::
```

```css title=theme/components.css
.diagram img {
  max-width: 500px;
  border-radius: 16px;
}
```

For a component that already has a directive, add a class directly to its opening line. See [Theming](/guides/theming/#style-one-instance).
