---
title: 提示框
description: 使用 note、tip、caution 或 danger 突出显示信息。
---
标题可省略，正文支持 Markdown。请根据内容含义选择类型。可以自定义 `.callout`、`.callout-title` 和 `--callout-color`，也可以给某个实例添加独立类名。

## 示例

:::note
Your theme styles load after the default CSS.
:::

:::tip
Add a class to style one component without changing the others.
:::

:::caution
Changes made directly in `site/` are replaced by the next build.
:::

:::danger
Deleting your source folder removes the pages used to build the site.
:::


## 添加提示框

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```


## 自定义

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```
