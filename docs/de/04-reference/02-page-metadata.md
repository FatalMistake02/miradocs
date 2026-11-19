---
title: Seitenmetadaten
description: Schreibe YAML-Metadaten zwischen ----Zeilen an den Dateianfang.
---
`title` setzt den Seitennamen, `description` die Beschreibung. `order` ändert die Reihenfolge, `search: false` schließt die Seite aus der Suche aus und `draft: true` blendet sie im Produktionsbuild aus. Die Entwicklungsvorschau zeigt Entwürfe. `layout: landing` entfernt die Seitenleisten; `sidebar: false` nimmt die Seite aus der automatischen Navigation. Die Optionsnamen bleiben wie in den Beispielen geschrieben.

## Optionen

| Option | Standard | Verwendung |
| --- | --- | --- |
| `title` | — | Titel; ohne Angabe wird der Dateiname verwendet |
| `description` | `""` | Einleitung und Metabeschreibung |
| `layout` | `"docs"` | landing entfernt die Seitenleisten |
| `order` | `0` | Sortierung vor der Reihenfolge der Dateinamen |
| `draft` | `false` | Nur in der Entwicklung anzeigen |
| `sidebar` | `true` | In Navigation und Zurück/Weiter-Links aufnehmen |
| `search` | `true` | In Suchergebnisse aufnehmen |


## Beispiele

```md title=docs/example.md
---
title: Installation
description: Install the project and start a preview.
layout: docs
order: 1
draft: false
sidebar: true
search: true
---

## Requirements

Write your content here.
```


## Häufige Anwendungen

```yaml
---
title: My project
description: What the project does.
layout: landing
sidebar: false
---
```

```yaml
---
title: Upcoming changes
draft: true
---
```
