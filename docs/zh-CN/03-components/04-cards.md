---
title: 卡片
description: 在自适应网格中展示相关链接。
---
将每个 `card` 放在 `cards` 内，用 ` | ` 分隔标题和目标地址。正文可添加 Markdown 说明。内部链接会遵循 `base` 设置。使用 `.cards` 和 `.content-card` 调整网格与卡片，也可以用实例类名进行单独设置。

## 示例

:::cards {.guide-cards}
:::card Installation | /zh-CN/getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /zh-CN/guides/theming/
Change fonts, colors, and component styles.
:::
:::


## 添加卡片

```md
:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card A card without a link
Add supporting content here.
:::
:::
```


## 自定义

```css title=theme/components.css
.guide-cards { gap: 20px; }
.guide-cards .content-card {
  padding: 24px;
  border-radius: 12px;
}
@media (min-width: 900px) {
  .guide-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```
