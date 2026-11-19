---
title: 选项卡
description: 用多个面板展示相关示例。
---
每个 `tab` 必须直接放在 `tabs` 内，设置标签并单独关闭。第一个面板默认选中。面板支持 Markdown 和嵌套组件。左右方向键切换选项卡，Home 和 End 选择第一个或最后一个。使用 `.tabs`、`.tab-list` 和 `.tab-panel` 自定义整体或单个实例。

## 示例

:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::


## 添加选项卡

````md
:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::
````


## 自定义

```css title=theme/components.css
.build-tabs { border-radius: 16px; }
.build-tabs .tab-list { gap: 28px; }
.build-tabs .tab-panel { padding: 12px 24px; }
.build-tabs [role="tab"][aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```
