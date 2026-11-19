---
title: 検索
description: 検索機能は標準で組み込まれ、初めて開いたときにインデックスを読み込みます。
---
Windows と Linux では Ctrl K、macOS では ⌘ K で開きます。矢印キーで結果を選び、Enter でページを開き、Esc で閉じます。`search.limit` と `search.threshold` で検索を調整できます。サイト設定の `search: false` は検索全体を無効にし、ページのメタデータではそのページだけを検索対象から外します。インデックスは言語ごとに分かれています。表示文言とスタイルも変更できます。

## 検索結果の設定

```json title=miradocs.config.json
{
  "search": {
    "limit": 10,
    "threshold": 0.35
  }
}
```

```yaml
---
title: Internal notes
search: false
---
```
