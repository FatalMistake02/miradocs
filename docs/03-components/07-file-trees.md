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

## Usage

Write a list inside `file-tree`. Indentation defines the hierarchy. A trailing slash identifies a folder even when it has no children. Filenames and extensions select recognizable language and tool icons. Specific names such as `package.json`, `tsconfig.json`, and `.gitignore` take priority over the extension. Unknown types use a generic file icon.

Items keep the order you write them in. Place folder entries before file entries to show folders first.

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

Add a description after ` — `. Names support inline code, emphasis, and links. Folder rows can be toggled with a click or with Enter or Space while focused.

## Start with folders closed

Use JSON options to set a title and the initial folder state:

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

## Customize

File-type icons use language and tool colors. Set `--tree-file-icon-color` to override all their colors, or target a type such as `[data-file-type="typescript"]`.

Supply your own images for exact filenames or extensions in the tree options. Put local images in `public/`:

```md
:::file-tree {"title":"Project","icons":{".mira":"/icons/mira.svg","special.config":"/icons/config.svg"}}
- index.mira
- special.config
:::
```

Use `"icons": false` to use the neutral Lucide file icons. Folder controls keep their Lucide icons in either mode.

`--tree-indent` sets nesting depth, `--tree-row-height` controls row spacing, `--tree-guide` colors connector lines, and `--tree-icon` colors the icons. Other colors use the shared theme tokens.

```css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```

The main selectors are `.file-tree-row`, `.file-tree-name`, `.file-tree-description`, and `.file-tree-directory`. Keep the folder disclosure element when customizing its markup or focus styles.
