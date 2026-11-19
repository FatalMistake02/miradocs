---
title: 导航
description: 文件夹对应侧栏分组，文件对应页面。
---
数字前缀控制顺序，不影响页面标题。通过 `sidebar` 显式配置分组、页面和外部链接；`collapsed` 可以让分组默认折叠。页面名称来自元数据中的标题。右侧目录显示二至六级标题。页面切换会更新 URL，无需重新加载整个文档；设置 `clientNavigation: false` 可改为完整页面加载。

## 示例

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::


## 设置侧栏

```json title=miradocs.config.json
{
  "sidebar": [
    {
      "label": "Guides",
      "items": [
        { "page": "guides/installation" },
        { "page": "guides/configuration" }
      ]
    },
    {
      "label": "Reference",
      "collapsed": true,
      "items": [{ "page": "reference" }]
    },
    { "label": "GitHub", "link": "https://github.com" }
  ]
}
```


## 示例

```md
## Installation

### Windows

### Linux

## Configuration
```
