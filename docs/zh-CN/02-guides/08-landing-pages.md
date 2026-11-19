---
title: 落地页
description: 创建不带侧栏的介绍页面。
---
在元数据中添加 `layout: landing` 和 `sidebar: false`，然后用 Markdown 编写介绍、链接和组件。可以用按钮引导读者开始使用，用卡片展示主要章节。通过实例类名在 `theme/` 中调整样式，其他文档页面仍可保持普通布局。

## 设置布局

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```


## 调整外观

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```
