---
title: 表格
description: 支持可选搜索与逐列样式的 Markdown 表格。
---
在 `table` 中编写普通 Markdown 表格。`search: true` 在标题栏添加搜索框，筛选正文行并保留列标题。`align` 支持统一值或逐列数组，可用值为 `start`、`center`、`end`、`left` 和 `right`。使用 `columnDividers: false` 和 `rowDividers: false` 隐藏分隔线，使用 `striped: true` 添加交替背景。`title`、`placeholder` 和 `empty` 控制文字。单元格支持链接、代码和强调。宽表格在容器内横向滚动。可通过实例类名和 `--table-*` 变量自定义样式。

## 示例

:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::

## Markdown

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

## 自定义

```css title=theme/components.css
.component-table {
  --table-bg: var(--bg);
  --table-header-bg: var(--surface);
  --table-border: var(--border);
  --table-radius: 10px;
  --table-cell-padding: 12px 20px;
  --table-stripe-bg: var(--hover);
}
.component-table th { font-weight: 500; }
.component-table td:last-child { color: var(--muted); }
```
