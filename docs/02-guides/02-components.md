---
title: Components
description: Give everyday content a little more structure, or bring your own reusable pieces.
---
## Tabs

Group related choices without making a page longer. Tabs support click and arrow-key navigation.

:::tabs
:::tab macOS / Linux
```sh
npm run build
```
:::
:::tab Windows
```powershell
npm run build
```
:::
:::

Write tabs with nested directives:

```md
:::tabs
:::tab First option
Content for the first option.
:::
:::tab Second option
Content for the second option.
:::
:::
```

## Custom components

Add an HTML file to `components/` and invoke it by filename. The template can contain `{{title}}` for the directive argument and `{{content}}` for rendered Markdown inside it. Templates are trusted project files; only use code you trust.

```html
<div class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</div>
```

Save this as `components/card.html`, then write:

```md
:::card A small idea
This content is rendered as Markdown.
:::
```

Style the component in your theme's CSS. The card on the introduction page uses this exact pattern.

