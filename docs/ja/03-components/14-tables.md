---
title: テーブル
description: 検索と列ごとのスタイルを設定できる Markdown テーブル。
---
`table` の中に通常の Markdown テーブルを書きます。`search: true` はヘッダーに検索欄を追加し、列見出しを残して本文の行を絞り込みます。`align` は共通値または列ごとの配列で、`start`、`center`、`end`、`left`、`right` を指定できます。`columnDividers: false` と `rowDividers: false` で区切り線を非表示にし、`striped: true` で交互の背景を付けます。`title`、`placeholder`、`empty` は表示文言を設定します。セルではリンク、コード、強調を使えます。幅の広いテーブルはコンテナー内でスクロールします。インスタンスのクラスと `--table-*` 変数で装飾できます。

## 例

:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::

## Markdown

```md
:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::
```

## カスタマイズ

```css title=theme/components.css
.component-table {
  --table-bg: var(--bg);
  --table-header-bg: var(--surface);
  --table-border: var(--border);
  --table-radius: 10px;
  --table-cell-padding: 12px 20px;
  --table-stripe-bg: var(--hover);
}
.component-table th { font-weight: 500; }
.component-table td:last-child { color: var(--muted); }
```
