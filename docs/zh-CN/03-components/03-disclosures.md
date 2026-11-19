---
title: 折叠内容
description: 使用 details 创建读者可展开或收起的内容。
---
开始行的文本作为标题，正文支持 Markdown 和其他组件。控件使用原生 `details` 元素，支持键盘操作。通过 `.details`、`.details-title`、`.details-indicator`、`.details-content` 以及背景、边框、圆角和内边距变量调整样式。

## 示例

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/zh-CN/guides/theming/).
:::


## 添加折叠内容

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```


## 自定义

```css title=theme/components.css
.output-details {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-border: var(--border);
  --details-header-hover: var(--hover);
}
.output-details .details-content { font-size: 14px; }
```
