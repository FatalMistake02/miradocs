---
title: 文件树
description: 在 file-tree 中使用嵌套 Markdown 列表展示文件和文件夹。
---
缩进表示层级，末尾的斜杠表示空文件夹。条目保留书写顺序。使用 ` — ` 添加说明，名称支持格式和链接。通过 `{ title: 项目, collapsed: true }` 让文件夹默认折叠。图标根据文件名和扩展名选择；`icons` 支持自定义图片，`icons: false` 使用中性图标。通过组件变量调整缩进和连接线。

## 示例

:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::


## 添加文件树

```md
:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::
```

```md
:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::
```

:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::


## 文件图标

```md
:::file-tree { title: Project, icons: { .mira: /icons/mira.svg, special.config: /icons/config.svg } }
- index.mira
- special.config
:::
```


## 自定义

```css title=theme/components.css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```
