---
title: 步骤
description: 将说明展示为编号步骤。
---
在 `steps` 内使用三级标题 (`###`)，每个标题都会开始一个步骤，并出现在页面目录中。每个步骤可以包含 Markdown 和组件。新的步骤块会从 1 重新编号。使用 `.steps` 和 `.steps h3::before` 调整编号及间距。

## 示例

:::steps
### Install dependencies
Install dependencies using your [package manager](/zh-CN/getting-started/installation/).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::


## 添加步骤

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
:::
```


## 自定义

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
