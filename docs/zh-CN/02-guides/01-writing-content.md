---
title: 编写内容
description: 使用 Markdown 和 YAML 元数据创建页面。
---
在文件开头设置 `title`，也可以添加 `description`。页面标题会自动显示，因此正文从 `##` 开始，子章节使用 `###`。支持链接、图片、表格、任务列表、脚注和组件。指向 `.md` 文件的链接会转换为页面 URL。图片和下载文件放在 `public/`。构建时会检查不存在的内部页面、文件和标题锚点。基本语法可参考 [CommonMark 教程](https://commonmark.org/help/tutorial/)。

## 创建页面

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

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

:::note Production build
Run the `build` script to generate the finished site.
:::
````


## 添加链接与图片

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```


## 添加组件

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::
