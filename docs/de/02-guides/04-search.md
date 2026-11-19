---
title: Suche
description: Die integrierte Suche lädt ihren Index beim ersten Öffnen.
---
Verwende unter Windows und Linux Ctrl K, unter macOS ⌘ K. Mit den Pfeiltasten wählst du Ergebnisse, mit der Eingabetaste öffnest du eine Seite und mit Esc schließt du die Suche. `search.limit` und `search.threshold` passen die Ergebnisse an. `search: false` deaktiviert die Website-Suche; in Seitenmetadaten schließt es nur diese Seite aus. Jede Sprache hat einen eigenen Index. Beschriftungen und Stile sind anpassbar.

## Ergebnisse konfigurieren

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
