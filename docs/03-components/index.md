---
title: Using components
description: Add components to Markdown and style individual instances.
---
Components are written as directives inside Markdown. Each guide below includes an example, the Markdown to create it, and styling options.

## Add a component

Put the opening line, content, and closing `:::` on separate lines:

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

Components can contain Markdown and other components. A `tab` must be directly inside a `tabs` group.

## Built-in components

:::cards
:::card Content groups | /components/content-groups/
Scope styles to a section of Markdown or nested components.
:::
:::card Tabs | /components/tabs/
Switch between related blocks of content.
:::
:::card Callouts | /components/callouts/
Notes, tips, cautions, and danger messages.
:::
:::card Disclosures | /components/disclosures/
Expandable content using native details elements.
:::
:::card Cards | /components/cards/
Link to related pages in a responsive grid.
:::
:::card Buttons | /components/buttons/
Give a navigation link the appearance of a button.
:::
:::card Steps | /components/steps/
Number a sequence of instructions.
:::
:::card File trees | /components/file-trees/
Display a directory structure.
:::
:::card Badges | /components/badges/
Display a short status label.
:::
:::card Code blocks | /components/code-blocks/
Highlighted code with a copy button.
:::
:::card Framework components | /components/framework-components/
Use React, Vue, Svelte, or a browser module.
:::
:::card Custom components | /components/custom-components/
Create a reusable HTML template.
:::
:::

## Customize a component

Append `{.class-name}` to the opening line to style one instance:

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```

```css title=theme/components.css
.setup-note { border-radius: 12px; }
.setup-note a { text-decoration-color: var(--accent); }
```

Put the CSS in a theme stylesheet and list it in the configuration's `styles` array. See [Theming](/guides/theming/#component-styles) for setup, shared variables, and more examples.

Instance classes work on every directive. Use a [content group](/components/content-groups/) to target ordinary Markdown, including a single heading, image, or code block.
