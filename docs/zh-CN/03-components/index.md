---
title: 使用组件
description: 在 Markdown 中直接使用组件。
---
开始行 `:::name`、内容和结束行 `:::` 必须分别独占一行。可配置组件使用 `{ title: 指南, search: true }` 这样的对象，键名和简单文本无需引号。选项之间用逗号分隔，冒号后加空格。包含逗号或特殊符号的文本需要加引号，原有 JSON 仍然有效。添加 `{.my-class}` 可单独设置某个实例的样式。

:::cards
:::card 表格 | /zh-CN/components/tables/
:::
:::card 选项卡 | /zh-CN/components/tabs/
:::
:::card 提示框 | /zh-CN/components/callouts/
:::
:::card 折叠内容 | /zh-CN/components/disclosures/
:::
:::card 卡片 | /zh-CN/components/cards/
:::
:::card 按钮 | /zh-CN/components/buttons/
:::
:::card 步骤 | /zh-CN/components/steps/
:::
:::card 文件树 | /zh-CN/components/file-trees/
:::
:::card 徽章 | /zh-CN/components/badges/
:::
:::card 代码块 | /zh-CN/components/code-blocks/
:::
:::card 自定义组件 | /zh-CN/components/custom-components/
:::
:::card 框架组件 | /zh-CN/components/framework-components/
:::
:::card 内容分组 | /zh-CN/components/content-groups/
:::
:::card 列表 | /zh-CN/components/lists/
:::
:::

## 示例

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

```md
:::list { title: Guides, search: true, columns: 2 }
- Installation
- Theming
:::
```

```md
:::list { title: "Setup: Windows, macOS, and Linux", search: true }
- Installation
- Configuration
:::
```
