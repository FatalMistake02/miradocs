---
title: 页面示例
description: 复制这些完整文件，即可建立一个小型站点。
---
示例包括首页、安装指南和配置参考。请按标注的路径保存文件，保留页面之间的链接，再将示例内容替换为自己的内容。数字前缀用于控制导航顺序。可以通过选项卡选择包管理器。

## 首页

````md title=docs/index.md
---
title: Project documentation
description: Setup instructions and configuration reference.
layout: landing
sidebar: false
---

Use these pages to install and configure the project.

:::button Installation | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Requirements, install commands, and a local preview.
:::
:::card Configuration | /reference/configuration/
Project settings and an example configuration file.
:::
:::
````


## 指南页面

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install dependencies and run the project locally.
---

## Requirements

- Node.js 20.19 or later
- A copy of the project repository

## Install

Run these commands from the project root:

:::tabs Package manager
:::tab npm
```sh
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun install
bun run dev
```
:::
:::

:::note Deployment
Run the `build` script when you are ready to generate static files.
:::

## Configure the site

Continue with [Configuration](../02-reference/01-configuration.md).
````


## 参考页面

````md title=docs/02-reference/01-configuration.md
---
title: Configuration
description: Settings for the documentation site.
---

## Settings

| Setting | Purpose | Default |
| --- | --- | --- |
| `title` | Name in the header | Documentation |
| `content` | Markdown directory | docs |
| `output` | Generated site directory | site |

## Example

```json title=miradocs.config.json
{
  "title": "Project documentation",
  "content": "docs",
  "output": "site"
}
```

:::details Where do paths resolve?
Configured file paths resolve relative to the configuration file.
:::

[Return to installation](../01-guides/01-installation.md)
````


## 示例

```sh
node bin/miradocs.js dev --config examples/basic/miradocs.config.json --port 8001
```
