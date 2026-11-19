---
title: 配置
description: 在 miradocs.config.json 中配置站点。
---
此文件使用标准 JSON；简化语法只适用于 Markdown 中的组件选项。可以设置标题、源文件和输出目录、样式、链接及语言。附带的 schema 可在支持的编辑器中提供补全与验证。`styles` 中的路径相对于 `theme/`。使用 `dev`、`build` 和 `preview` 分别开发、构建和预览。`--config` 指定其他配置文件，`--port` 修改端口。通过 `miradocs:navigate` 在页面切换后初始化脚本。

## 选项

| 选项 | 默认值 | 用途 |
| --- | --- | --- |
| `title` | `"Documentation"` | 站点名称 |
| `site` | — | 用于规范 URL 和站点地图的公开源地址 |
| `base` | `"/"` | URL 路径前缀 |
| `logo` | — | 标题栏图片 |
| `favicon` | — | 浏览器标签页图标 |
| `links` | `[]` | 标题栏链接 |
| `footer` | — | 页脚文本 |
| `editUrl` | — | 用于编辑页面链接的仓库文件夹 URL |
| `content` | `"docs"` | Markdown 页面目录 |
| `output` | `"site"` | 与源文件分离的输出目录 |
| `theme` | `"theme"` | 自定义样式目录 |
| `components` | `"components"` | HTML 模板目录 |
| `public` | `"public"` | 原样复制的文件 |
| `styles` | `[]` | 相对于 theme 的样式表及加载顺序 |
| `sidebar` | — | 分组和链接；省略时根据文件夹生成 |
| `search` | `{}` | 搜索设置；false 关闭搜索 |
| `language` | `"en"` | 单语言站点的语言代码 |
| `locales` | — | 语言、目录、标签和文字方向 |
| `clientNavigation` | `true` | 无需重新加载整个文档的页面切换 |
| `strictLinks` | `true` | 检查不存在的内部页面、文件和锚点 |
| `markdown.html` | `false` | 允许 Markdown 中的原始 HTML |
| `scripts` | `[]` | 浏览器模块 URL |
| `clientComponents` | `{}` | 已注册的 React、Vue、Svelte 组件和模块 |


## 基本配置

```json title=miradocs.config.json
{
  "$schema": "./node_modules/miradocs/miradocs.schema.json",
  "title": "Project docs",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```


## 标题栏链接与图标

```json title=miradocs.config.json
{
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-name/your-project",
      "icon": "github",
      "newTab": true
    },
    {
      "label": "Community",
      "url": "https://example.com/community",
      "icon": "custom:/icons/community.svg"
    }
  ]
}
```


## 命令

:::tabs 包管理器
:::tab npm
| Command | What it does |
| --- | --- |
| `npm run dev` | Build, watch your files, and refresh the preview |
| `npm run build` | Generate the production site |
| `npm run preview` | Build and preview without watching |
:::
:::tab pnpm
| Command | What it does |
| --- | --- |
| `pnpm run dev` | Build, watch your files, and refresh the preview |
| `pnpm run build` | Generate the production site |
| `pnpm run preview` | Build and preview without watching |
:::
:::tab Yarn
| Command | What it does |
| --- | --- |
| `yarn run dev` | Build, watch your files, and refresh the preview |
| `yarn run build` | Generate the production site |
| `yarn run preview` | Build and preview without watching |
:::
:::tab Bun
| Command | What it does |
| --- | --- |
| `bun run dev` | Build, watch your files, and refresh the preview |
| `bun run build` | Generate the production site |
| `bun run preview` | Build and preview without watching |
:::
:::

:::tabs 包管理器
:::tab npm
```sh
npx miradocs build --config miradocs.config.json
npx miradocs dev --port 8001
npx miradocs serve --port 8001
```
:::
:::tab pnpm
```sh
pnpm exec miradocs build --config miradocs.config.json
pnpm exec miradocs dev --port 8001
pnpm exec miradocs serve --port 8001
```
:::
:::tab Yarn
```sh
yarn exec miradocs build --config miradocs.config.json
yarn exec miradocs dev --port 8001
yarn exec miradocs serve --port 8001
```
:::
:::tab Bun
```sh
bunx --no-install miradocs build --config miradocs.config.json
bunx --no-install miradocs dev --port 8001
bunx --no-install miradocs serve --port 8001
```
:::
:::
