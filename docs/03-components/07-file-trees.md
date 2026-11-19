---
title: File trees
description: Display files and folders from a nested Markdown list.
---
## Example

:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::

## Add a file tree

Put a nested Markdown list inside `file-tree`. Indentation creates the hierarchy. Use a trailing slash for an empty folder.

```md
:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::
```

Add a description after ` — `. Names support inline code, emphasis, and links. Items keep the order you write them in, so put folders first if that is the order you want.

### Start with folders closed

Use JSON options to set a title and close folders initially:

```md
:::file-tree {"title":"Project","collapsed":true}
- docs/
  - index.md
- theme/
  - tokens.css
:::
```

:::file-tree {"title":"Project","collapsed":true}
- docs/
  - index.md
- theme/
  - tokens.css
:::

## File icons

Filenames and extensions select language and tool icons. Names such as `package.json`, `tsconfig.json`, and `.gitignore` take priority over the extension. Unknown types use a generic file icon.

### Custom icons

Map an exact filename or extension to your own image. Put local images in `public/`:

```md
:::file-tree {"title":"Project","icons":{".mira":"/icons/mira.svg","special.config":"/icons/config.svg"}}
- index.mira
- special.config
:::
```

Set `"icons": false` to use neutral Lucide file icons instead.

### Icon colors

File-type icons use their language or tool colors. Set `--tree-file-icon-color` on the tree to override them all. For one type, target a selector such as `[data-file-type="typescript"]`.

## Customize

Use the component variables to change spacing, guide lines, and the color of folders and fallback icons:

```css title=theme/components.css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```

The selectors are `.file-tree-row`, `.file-tree-name`, `.file-tree-description`, and `.file-tree-directory`. Add an [instance class](/guides/theming/#style-one-instance) to limit your changes to one tree.
