---
title: 按钮
description: 使用 button 将导航链接显示为按钮。
---
用 ` | ` 分隔标签和 URL，再用 `:::` 关闭组件。它本质上仍是链接，适合用于页面跳转。添加实例类名后，可在自己的样式表中通过 `.action-button` 调整外观。

## 示例

:::button Get started | /zh-CN/getting-started/installation/
:::


## 添加按钮

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```


## 自定义

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```
