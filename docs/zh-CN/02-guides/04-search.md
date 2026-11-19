---
title: 搜索
description: 站点自带搜索功能，首次打开时才会加载索引。
---
Windows 和 Linux 使用 Ctrl K，macOS 使用 ⌘ K。方向键选择结果，Enter 打开页面，Esc 关闭窗口。通过 `search.limit` 和 `search.threshold` 调整搜索。站点配置中的 `search: false` 会关闭全站搜索；页面元数据中的同名设置只会将该页排除在索引之外。每种语言都有独立的搜索索引，界面文字和样式也可以自定义。

## 配置搜索结果

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
