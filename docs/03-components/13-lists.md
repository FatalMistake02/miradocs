---
title: Lists
description: Display Markdown lists with optional search.
---
Use a list to group resources, options, or reference entries. Add search when readers need to find an item in a longer list.

## Example

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/guides/deployment/)  
  Build your site and put it online.
:::

## Add a list

Write a Markdown list inside `:::list`. Search is off by default; the title is optional.

:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::

```md
:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::
```

Use `1.` instead of `-` for a numbered list. Rows can contain links, emphasis, code, paragraphs, and nested lists. Keep one list inside each component.

## Add search

Pass an options object with `search: true`:

```md
:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/guides/deployment/)  
  Build your site and put it online.
:::
```

The search field appears on the right of the list header. Search matches words anywhere in an entry, including descriptions and nested items. Capitalization and accents do not affect matching. Nested items stay with their parent. Each list filters independently, and all items remain readable without JavaScript.

## Use columns

Set `columns` to the number of columns you want, from `1` to `6`. Entries fill across each row in the order you write them. The list uses fewer columns when space is limited.

```md
:::list { title: Resources, columns: 2 }
- Installation
- Configuration
- Theming
- Deployment
:::
```

Columns also work with numbered lists and with search. Filtering moves matching entries together without leaving empty spaces.

## Options

| Option | Purpose | Default |
| --- | --- | --- |
| `title` | Heading above the rows | No heading |
| `search` | Show a search field | `false` |
| `columns` | Maximum number of columns, from `1` to `6` | `1` |
| `placeholder` | Search field text and accessible label | “Search this list…” |
| `empty` | Message when no rows match | “No matching items.” |

The default messages follow the page language. Override `listSearch`, `listEmpty`, `listResults`, or `searchClear` in your locale's `ui` settings to change shared messages.

## Customize

Target one list with its instance class:

```css title=theme/components.css
.guide-list {
  --list-bg: var(--bg);
  --list-border: var(--border);
  --list-radius: 10px;
  --list-padding: 20px;
  --list-column-min-width: 220px;
  --list-search-width: 220px;
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```

`--list-column-min-width` controls when columns combine as the list gets narrower. `--list-search-width` sets the header search field's preferred width.

The shared selectors are `.content-list`, `.list-header`, `.list-title`, `.list-filter`, `.list-search`, `.list-clear`, `.list-content`, and `.list-empty`. See [Theming](/guides/theming/#component-styles) for stylesheet setup.
