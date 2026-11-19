---
title: Tables
description: Display Markdown tables with optional search and column styling.
---
Use a table for entries that share the same fields. Write a normal Markdown table inside `:::table` and add options when you need them.

## Example

:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::

## Add a table

```md
:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::
```

The title and options are optional. Cells support inline Markdown, including links, code, and emphasis. The separator row is required. Keep one table inside each component.

## Search and columns

`search: true` puts a search field on the right of the header. Search filters body rows across all cells while keeping the column headings visible. It ignores capitalization and accents. Each table filters independently; all rows remain readable without JavaScript.

Use Markdown's `:---`, `:---:`, and `---:` separators for column alignment, or override them with `align`. Acceptable values are `start`, `center`, `end`, `left`, and `right`. A single value applies to all columns; an array applies by column. Omitted entries retain their Markdown alignment. `start` and `end` follow the reading direction.

Wide tables scroll within their container. Focus the table region to scroll using the keyboard.

## Options

| Option | Purpose | Default |
| --- | --- | --- |
| `title` | Heading and accessible table name | No heading |
| `search` | Search body rows | `false` |
| `placeholder` | Search text and accessible label | “Search rows…” |
| `empty` | Message when nothing matches | “No matching items.” |
| `align` | One alignment or an array of column alignments | Markdown alignment |
| `columnDividers` | Vertical lines between columns | `true` |
| `rowDividers` | Horizontal lines between rows | `true` |
| `striped` | Alternate backgrounds on visible rows | `false` |

For example, `{ striped: true, rowDividers: false, align: [start, center, end] }` combines three options. The number of columns comes from your Markdown table.

## Customize

```css title=theme/components.css
.component-table {
  --table-bg: var(--bg);
  --table-header-bg: var(--surface);
  --table-border: var(--border);
  --table-radius: 10px;
  --table-cell-padding: 12px 20px;
  --table-column-min-width: 130px;
  --table-stripe-bg: var(--hover);
}
.component-table th { font-weight: 500; }
.component-table td:last-child { color: var(--muted); }
```

Use `.content-table` for shared table styles and an instance class for a specific table. Header controls use `.list-header`, `.list-filter`, and `.list-search`, like [Lists](/components/lists/). Set `tableSearch`, `listEmpty`, `listResults`, and `searchClear` in a locale's `ui` settings to change shared search messages. See [Theming](/guides/theming/#component-styles) for stylesheet setup.
