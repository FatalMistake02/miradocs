---
title: 内容分组
description: 使用 group 为一段 Markdown 添加类名。
---
分组内可包含标题、图片、代码或其他组件。`{.my-class}` 会添加到 `.content-group` 容器，从而在 `theme/` 中仅修改这部分内容。分组支持嵌套，无需为了添加样式容器而创建 HTML 模板。

## 添加分组

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [Installation guide](/getting-started/installation/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```


## 示例

:::group {.group-example}
### A grouped section

This paragraph and its [link](/zh-CN/guides/theming/) share one container.
:::


## 设置单个元素的样式

```md
:::group {.diagram}
![Architecture](/images/architecture.svg)
:::
```

```css title=theme/components.css
.diagram img {
  max-width: 500px;
  border-radius: 16px;
}
```
