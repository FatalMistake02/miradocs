---
title: Custom components
description: Add reusable markup, styles, and optional client-side behavior.
---
## Example

:::example Example component
This component comes from `components/example.html`. Its body is rendered Markdown.
:::

## Create a template

Add an HTML file to the configured components directory. Its filename becomes the directive name.

```html title=components/example.html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

Templates must contain exactly one `{{content}}` placeholder. It receives the rendered body. `{{title}}` receives the escaped directive argument and can appear more than once.

## Use the component

```md
:::example Example component
This body supports **Markdown**.
:::
```

## Add styles

Put CSS in a file under the theme folder and include it in the configuration's `styles` array.

```css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
```

## Add behavior

Put a JavaScript module in `public/` and list its URL in the configuration's `scripts` array. The module loads on every page, so initialize only when the component exists.

```json
{ "scripts": ["/example.js"] }
```

Templates and scripts are trusted project code. Use raw HTML in Markdown only when all content authors are trusted. Raw HTML is disabled by default.
