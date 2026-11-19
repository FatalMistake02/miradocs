---
title: 部署
description: 构建站点后，将它发布到静态托管服务。
---
运行 `build`，再用 `preview` 检查结果，最后上传 `site/` 中的内容。服务器应为目录 URL 提供 `index.html`，并使用 `404.html` 作为错误页。如果从 Git 构建，请提交锁文件，并设置对应包管理器的命令。部署到子路径时设置 `base`；设置 `site` 后可生成规范 URL 和站点地图。构建失败时，上一次成功的输出会保留。

## 构建与预览

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


## 配置托管服务

:::tabs 包管理器
:::tab npm
| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `site` |
:::
:::tab pnpm
| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm run build` |
| Output directory | `site` |
:::
:::tab Yarn
| Setting | Value |
| --- | --- |
| Install command | `yarn install --immutable` |
| Build command | `yarn run build` |
| Output directory | `site` |
:::
:::tab Bun
| Setting | Value |
| --- | --- |
| Install command | `bun install --frozen-lockfile` |
| Build command | `bun run build` |
| Output directory | `site` |
:::
:::

```json title=miradocs.config.json
{
  "site": "https://example.com",
  "base": "/handbook/"
}
```
