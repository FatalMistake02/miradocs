---
title: コードブロック
description: コードをバッククォート 3 個の行で囲み、開始行に言語名を指定します。
---
`title=filename` で表示ラベルを変更できます。構文の強調表示、横スクロール、コピーボタンが付いています。ブロック内の内容は実行されず、コンポーネントとしても解釈されません。コード用変数と `.code-block`、`.code-top`、`pre` で外観を調整します。

## 例

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```


## コードブロックの追加

````md
```js title=example.js
const options = { theme: 'system' };
```
````


## カスタマイズ

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```
