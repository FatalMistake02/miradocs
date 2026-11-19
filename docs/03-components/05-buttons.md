---
title: Buttons
description: Style a navigation link as a button.
---
## Example

:::button Installation | /getting-started/installation/
:::

## Usage

Provide the label and URL in the directive title, separated by ` | `. Keep the body empty.

```md
:::button Installation | /getting-started/installation/
:::
```

The component renders an anchor. Use it for navigation rather than submitting forms or running application actions. Root-relative URLs receive the site's configured base prefix.

## Customize

Give one button a class after its URL, then style that class in your theme stylesheet:

```md title=docs/index.md
:::button Get started | /getting-started/installation/ {.hero-button}
:::
```

```css title=theme/components.css
.hero-button {
  background: var(--accent-gradient);
  color: white;
  border: 0;
  border-radius: 999px;
}
```

The class is added to this button only. Other buttons keep their usual styles. The `{.class-name}` suffix also works on other component directives.

The selector is `.action-button`. Its default colors use `--accent` and `--accent-text`.

```css
.action-button {
  border-radius: 999px;
  padding: 12px 22px;
  background: var(--text);
  color: var(--bg);
}
```

A `components/button.html` file can replace the markup. The title passed to a custom template is the full directive argument.
