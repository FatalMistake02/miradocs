---
title: 安装
description: 创建站点并开始编写文档。
---
需要 Node.js 20.19 或更高版本；生成的站点是静态的，托管服务器不需要 Node.js。选择包管理器，创建项目、安装依赖并运行 `dev`。保存文件后预览会自动更新。内容放在 `docs/`，自定义样式放在 `theme/`。运行 `build` 将站点生成到 `site/`。

## 创建站点

:::tabs 包管理器
:::tab npm
```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm create miradocs@latest my-docs
cd my-docs
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn dlx create-miradocs@latest my-docs
cd my-docs
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun create miradocs@latest my-docs
cd my-docs
bun install
bun run dev
```
:::
:::

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::


## 编写第一个页面

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```


## 构建站点

:::tabs 包管理器
:::tab npm
```sh
npm run build
npm run preview
```
:::
:::tab pnpm
```sh
pnpm run build
pnpm run preview
```
:::
:::tab Yarn
```sh
yarn run build
yarn run preview
```
:::
:::tab Bun
```sh
bun run build
bun run preview
```
:::
:::
