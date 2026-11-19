---
title: 独自コンポーネント
description: 再利用する HTML テンプレートを components/ に作成します。
---
ファイル名がディレクティブ名になります。`{{title}}` にはタイトル、`{{content}}` には変換済みの Markdown 本文が入ります。`{{content}}` は必ず 1 個だけ含めてください。インスタンスのクラスは最外側の要素に追加されます。スタイルは `theme/` に置きます。独自の動作は `scripts` のモジュールに書き、初回と `miradocs:navigate` の後に初期化します。独自のマウントや後処理が必要な場合は、フレームワークコンポーネントとして登録できます。

## 例

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::


## テンプレートの作成

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


## スタイルの追加

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```


## JavaScript の追加

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
