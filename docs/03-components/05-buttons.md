---
title: Buttons
description: Give a navigation link the appearance of a button.
---
## Example

:::button Get started | /getting-started/installation/
:::

## Add a button

Use `button` with a label and URL separated by ` | `. Leave the body empty.

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```

This creates a link, so use it to navigate to another page. For a control that submits a form or runs JavaScript, use a [custom component](/components/custom-components/).

## Customize

Style the instance class in your theme stylesheet:

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```

Use `.action-button` to style all button links. Default colors use `--accent` and `--accent-text`.

For different markup, add a `components/button.html` [template](/components/custom-components/). Its `{{title}}` value contains the label and URL argument.
