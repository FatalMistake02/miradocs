---
title: バッジ
description: badge は、状態やバージョンなどの短いラベルに使用します。
---
ディレクティブ名の後に表示する文字列を書きます。長い説明はページ本文に置いてください。`.badge` または独自のクラスで色、枠線、文字のスタイルを変更できます。

## 例

:::badge Beta
:::


## バッジの追加

```md
:::badge Beta {.release-badge}
:::
```


## カスタマイズ

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
