---
title: 列表
description: 使用 list 分组展示 Markdown 条目。
---
标题可省略，`search: true` 会在标题栏加入搜索框。`columns` 支持 1 至 6 列，空间不足时自动减少列数。`columnDividers: false` 隐藏纵向分隔线。`align: [start, end]` 指定各列对齐方式，也支持 `center`、`left`、`right`，或用单个值设置所有列。搜索不区分大小写和重音，嵌套内容与父条目一起保留，结果会重新排列。通过 `placeholder` 和 `empty` 修改提示文字，通过实例类名与 `--list-*` 变量调整样式。

## 选项

| 选项 | 默认值 | 用途 |
| --- | --- | --- |
| `title` | — | 可选标题 |
| `search` | `false` | 标题栏搜索框 |
| `columns` | `1` | 最大列数：1 至 6 |
| `columnDividers` | `true` | 列间纵向分隔线 |
| `align` | `"start"` | 统一或逐列设置对齐方式 |
| `placeholder` | `"搜索此列表…"` | 搜索框文字与标签 |
| `empty` | `"没有匹配的条目。"` | 没有匹配项时的提示 |


## 示例

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/zh-CN/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/zh-CN/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/zh-CN/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/zh-CN/guides/deployment/)  
  Build your site and put it online.
:::


## 添加列表

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


## 添加搜索

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


## 使用多列

```md
:::list { title: Resources, columns: 2 }
- Installation
- Configuration
- Theming
- Deployment
:::
```

:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] } {.resource-list}
- Installation
- Configuration
- Theming
- Deployment
:::

```md
:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] }
- Installation
- Configuration
- Theming
- Deployment
:::
```


## 自定义

```css title=theme/components.css
.guide-list {
  --list-bg: var(--bg);
  --list-border: var(--border);
  --list-radius: 10px;
  --list-padding: 20px;
  --list-column-min-width: 220px;
  --list-search-width: 220px;
  --list-column-divider: transparent;
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```
