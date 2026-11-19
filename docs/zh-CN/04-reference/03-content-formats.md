---
title: 内容格式
description: 页面使用带 YAML 元数据的 .md 文件。
---
Markdown 支持表格、任务列表、脚注、自动链接和组件。JSON 用于站点配置，HTML 用于模板，CSS 用于样式，JavaScript 用于可选交互。JSX、Vue 和 Svelte 不是页面输入格式，需要注册为框架组件。代码块只展示内容，不会执行。Markdown 中的原始 HTML 需要设置 `markdown.html: true`。语法可参考 [Markdown 指南](https://www.markdownguide.org/extended-syntax/)。

## 页面元数据

```md title=docs/example.md
---
title: "Install: Windows"
description: Set up the project on Windows.
draft: false
---

## Requirements

Write the page content here.
```


## HTML

```json title=miradocs.config.json
{
  "markdown": { "html": true }
}
```

```md
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.
```


## 代码示例

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````
