---
title: Groups
description: Scope CSS to any section of Markdown or nested components.
---
## Usage

A group adds a plain container around its content. Give it a class to style one heading, image, table, code example, or section without changing other content.

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [setup guide](/getting-started/quick-start/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```

List your stylesheet in the configuration's `styles` array. See [Theming](/guides/theming/) for setup.

## Example

:::group {.group-example}
### A grouped section

This paragraph and its [link](/guides/theming/) share a container. The group has no default visual treatment.
:::

## Target one element

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

## Other components

The `{.class-name}` suffix also works directly on tabs, callouts, disclosures, cards, action links, steps, badges, file trees, custom templates, and framework component containers. Use a group when you want to scope styles across several elements or ordinary Markdown.
