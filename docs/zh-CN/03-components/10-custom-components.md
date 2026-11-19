---
title: 自定义组件
description: 在 components/ 中创建可复用的 HTML 模板，文件名就是指令名称。
---
`{{title}}` 接收标题，`{{content}}` 接收渲染后的 Markdown 正文；模板必须且只能包含一个 `{{content}}`。实例类名会添加到最外层元素。样式保存在 `theme/`。自定义交互可通过 `scripts` 加载模块，并在首次加载及 `miradocs:navigate` 后初始化。需要独立挂载与清理逻辑时，可以注册为框架组件。

## 示例

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::


## 创建模板

```html title=components/example.html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

```md
:::example Release notes {.release-summary}
Add a short summary, a list of changes, or a link to the full release.
:::
```


## 添加样式

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```


## 添加 JavaScript

```json title=miradocs.config.json
{
  "scripts": ["/example.js"]
}
```

```js title=public/example.js
function initializeExample() {
  document.querySelectorAll(".feature-card").forEach(card => {
    if (card.dataset.initialized) return;
    card.dataset.initialized = "true";
    // Set up the behavior for this card.
  });
}

initializeExample();
document.addEventListener("miradocs:navigate", initializeExample);
```
