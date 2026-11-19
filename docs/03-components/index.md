---
title: Overview
description: Built-in components, usage examples, and customization.
---
Components use fenced directives: an opening line such as `:::note Title`, Markdown content, and a closing `:::`. Components can be nested, except that a tab must be a direct child of a tabs group.

Every component accepts instance classes: `:::note Title {.my-note}`. Put the matching CSS in your theme stylesheet. Use `.my-note` to style that instance, or `.my-note a` to style links inside it. See [Theming](/guides/theming/#style-one-instance) for examples across component types and [Groups](/components/content-groups/) for styling ordinary Markdown.

:::cards
:::card Groups | /components/content-groups/
Wrap any Markdown or components to style a particular section.
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
:::card Action links | /components/buttons/
Present a link as an action button.
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

## Shared customization

List CSS files in the configuration's `styles` array. Those files load after the default theme. Use [theme tokens](/guides/theming/) to change shared colors and geometry. Each component page lists the selectors for changes limited to that component.
