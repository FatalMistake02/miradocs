---
title: Lists
description: Display Markdown lists with optional search.
---
Use a list to group resources, options, or reference entries. Add search when readers need to find an item in a longer list.

## Example

:::list {"title":"Guides","search":true,"placeholder":"Find a guide…"} {.guide-list}
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

Pass a JSON object with `"search": true`:

```md
:::list {"title":"Guides","search":true,"placeholder":"Find a guide…"} {.guide-list}
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

Search matches words anywhere in a row, including descriptions and nested items. Capitalization and accents do not affect matching. Nested items stay with their parent. Each list filters independently, and all items remain readable without JavaScript.

### Options

| Option | Purpose | Default |
| --- | --- | --- |
| `title` | Heading above the rows | No heading |
| `search` | Show a search field | `false` |
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
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```

The shared selectors are `.content-list`, `.list-title`, `.list-filter`, `.list-search`, `.list-clear`, `.list-content`, and `.list-empty`. See [Theming](/guides/theming/#component-styles) for stylesheet setup.
