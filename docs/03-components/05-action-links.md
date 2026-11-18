---
title: Action links
description: Style a navigation link as a button.
---
## Example

:::button Installation | /getting-started/quick-start/
:::

## Usage

Provide the label and URL in the directive title, separated by ` | `. Keep the body empty.

```md
:::button Installation | /getting-started/quick-start/
:::
```

The component renders an anchor. Use it for navigation rather than submitting forms or running application actions. Root-relative URLs receive the site's configured base prefix.

## Customize

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
