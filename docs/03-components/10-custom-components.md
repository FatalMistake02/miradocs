---
title: Custom components
description: Create reusable HTML templates with Markdown content.
---
Use a template when you need markup that is not provided by a built-in component. For React, Vue, or Svelte, see [Framework components](/components/framework-components/).

## Example

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::

## Create a template

Add an HTML file to `components/`. Its filename becomes the directive name:

```html title=components/example.html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

`{{title}}` receives the text after the directive name. `{{content}}` receives the rendered Markdown body. Include exactly one `{{content}}` placeholder.

### Use it in a page

```md
:::example Release notes {.release-summary}
Add a short summary, a list of changes, or a link to the full release.
:::
```

The instance class is added to the template's outer element.

## Add styles

Put CSS in your theme folder and list the file in the configuration's `styles` array. See [Theming](/guides/theming/#add-your-styles) for setup.

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```

## Add JavaScript

For optional behavior, put a module in `public/` and add it to `scripts`:

```json title=miradocs.config.json
{
  "scripts": ["/example.js"]
}
```

Scripts load once. Initialize your component when the script first loads and after `miradocs:navigate`, so it also works after switching pages:

```js title=public/example.js
function initializeExample() {
  document.querySelectorAll(".feature-card").forEach(card => {
    if (card.dataset.initialized) return;
    card.dataset.initialized = "true";
    // Set up the behavior for this card.
  });
}

initializeExample();
document.addEventListener("miradocs:navigate", initializeExample);
```

Use [framework components](/components/framework-components/) when your component needs its own mount and cleanup functions.
