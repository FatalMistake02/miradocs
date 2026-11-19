---
title: 项目结构
description: 使用文件和文件夹组织站点。
---
页面放在 `docs/`，HTML 模板放在 `components/`，样式放在 `theme/`，需要原样复制的文件放在 `public/`。站点配置保存在 `miradocs.config.json`。数字前缀控制排序，不会出现在 URL 中。`index.md` 是所在文件夹的首页。不要直接修改 `site/`，每次成功构建都会替换其内容。

## 示例

:::file-tree Project
- docs/ — Markdown pages
  - index.md
  - 01-guides/
    - 01-installation.md
- theme/ — your styles
  - tokens.css
  - components.css
- components/ — reusable components
- public/ — images, fonts, and downloads
- miradocs.config.json
- package.json
- site/ — generated output
:::
