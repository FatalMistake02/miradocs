---
title: Navigation
description: 'Ordner erzeugen Gruppen, Dateien erzeugen Seiten in der Seitenleiste.'
---
Zahlenpräfixe bestimmen die Reihenfolge, ohne die Titel zu ändern. Mit `sidebar` legst du Gruppen, Seiten und externe Links ausdrücklich fest. `collapsed` schließt eine Gruppe zu Beginn. Der Seitentitel stammt aus den Metadaten. Die Seitenübersicht folgt Überschriften der Ebenen zwei bis sechs. Beim Seitenwechsel wird die URL ohne vollständiges Neuladen aktualisiert. `clientNavigation: false` aktiviert vollständige Seitenaufrufe.

## Beispiele

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::


## Seitenleiste festlegen

```json title=miradocs.config.json
{
  "sidebar": [
    {
      "label": "Guides",
      "items": [
        { "page": "guides/installation" },
        { "page": "guides/configuration" }
      ]
    },
    {
      "label": "Reference",
      "collapsed": true,
      "items": [{ "page": "reference" }]
    },
    { "label": "GitHub", "link": "https://github.com" }
  ]
}
```


## Beispiele

```md
## Installation

### Windows

### Linux

## Configuration
```
