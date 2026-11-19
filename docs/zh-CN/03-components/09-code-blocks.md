---
title: 代码块
description: 用三反引号包裹代码，并在开始行指定语言。
---
使用 `title=filename` 更改显示标签。代码块自带语法高亮、横向滚动和复制按钮。块内内容不会执行，也不会解析为组件。通过代码变量以及 `.code-block`、`.code-top` 和 `pre` 调整样式。

## 示例

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```


## 添加代码块

````md
```js title=example.js
const options = { theme: 'system' };
```
````


## 自定义

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```
