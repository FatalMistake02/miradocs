---
title: タブ
description: 関連する例を複数のパネルに分けて表示します。
---
各 `tab` は `tabs` の直下に置き、ラベルと個別の終了行を付けます。最初のパネルが初期選択されます。パネル内では Markdown と入れ子のコンポーネントを使用できます。左右の矢印キーで切り替え、Home と End で最初と最後のタブを選択します。`.tabs`、`.tab-list`、`.tab-panel` でスタイルを調整できます。

## 例

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


## タブの追加

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


## カスタマイズ

```css title=theme/components.css
.build-tabs { border-radius: 16px; }
.build-tabs .tab-list { gap: 28px; }
.build-tabs .tab-panel { padding: 12px 24px; }
.build-tabs [role="tab"][aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```
