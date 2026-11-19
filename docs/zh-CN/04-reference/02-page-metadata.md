---
title: 页面元数据
description: 在文件开头用两行 --- 包裹 YAML 元数据。
---
`title` 设置页面名称，`description` 设置说明。`order` 修改排序，`search: false` 将页面排除在搜索之外，`draft: true` 在生产构建中隐藏页面。开发预览会显示草稿。`layout: landing` 去掉侧栏，`sidebar: false` 将页面从自动导航中排除。选项名称请保持示例中的原样。

## 选项

| 选项 | 默认值 | 用途 |
| --- | --- | --- |
| `title` | — | 标题；省略时使用文件名 |
| `description` | `""` | 介绍与元数据说明 |
| `layout` | `"docs"` | landing 去掉侧栏 |
| `order` | `0` | 优先于文件名的排序值 |
| `draft` | `false` | 仅在开发环境显示 |
| `sidebar` | `true` | 包含在导航与上一页/下一页链接中 |
| `search` | `true` | 包含在搜索结果中 |


## 示例

```md title=docs/example.md
---
title: Installation
description: Install the project and start a preview.
layout: docs
order: 1
draft: false
sidebar: true
search: true
---

## Requirements

Write your content here.
```


## 常见用法

```yaml
---
title: My project
description: What the project does.
layout: landing
sidebar: false
---
```

```yaml
---
title: Upcoming changes
draft: true
---
```
