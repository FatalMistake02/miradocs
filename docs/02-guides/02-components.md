---
title: Components
description: Use built-in content components or add your own HTML templates.
---
## Callouts

:::note Note
Add context without interrupting the page.
:::
:::tip Tip
Use a short, specific title.
:::
:::caution Caution
Explain a consequence readers need to understand.
:::
:::danger Danger
Reserve this for destructive or irreversible actions.
:::

Write `:::note Optional title`, the body, then `:::`. All components can contain Markdown and nested components.

## Tabs

:::tabs
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::

Wrap `:::tab Label` blocks in a `:::tabs` block. Tab selection supports click, arrow keys, Home, and End.

## Disclosures

:::details How do disclosures work?
Use `:::details Your question` for a native disclosure. It remains functional without JavaScript.
:::

## Cards and actions

:::cards
:::card Navigation | /guides/navigation/
Organize nested folders or define your own sidebar.
:::
:::card Theming | /guides/theming/
Change semantic tokens without duplicating the layout.
:::
:::

Wrap `:::card Title | /path/` blocks in `:::cards`. The link is optional. Use `:::button Label | /path/` for an action link.

## Steps

:::steps
### Install
Install the project dependencies.
### Configure
Set the title and content directory.
### Build
Generate static files for your host.
:::

Use `:::steps` around level-three headings and their content. Other built-ins include `:::file-tree` around a nested list, and `:::badge Label` for a small status label.

## Custom components

Add a file such as `components/example.html`:

```html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

Invoke it with `:::example A title`, followed by Markdown and a closing `:::`. Templates must contain exactly one `{{content}}` placeholder. `{{title}}` is escaped automatically. Add component styles in your theme. A template with the same name as a card or button replaces that built-in.
