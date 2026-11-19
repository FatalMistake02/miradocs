---
title: 徽章
description: 使用 badge 显示简短标签，例如状态或版本号。
---
文本写在指令名称之后，较长的说明应放在正文中。使用 `.badge` 或实例类名调整颜色、边框和字体。

## 示例

:::badge Beta
:::


## 添加徽章

```md
:::badge Beta {.release-badge}
:::
```


## 自定义

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
