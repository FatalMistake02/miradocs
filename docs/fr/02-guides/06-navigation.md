---
title: Navigation
description: >-
  Les dossiers créent des groupes et les fichiers créent des pages dans la barre
  latérale.
---
Les préfixes numériques contrôlent l’ordre sans modifier les titres. Utilisez `sidebar` pour définir explicitement groupes, pages et liens externes ; `collapsed` ferme un groupe au départ. Le titre de page vient des métadonnées. Le sommaire suit les titres de niveau deux à six. La navigation actualise l’URL sans recharger tout le document ; `clientNavigation: false` rétablit les chargements complets.

## Exemples

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::


## Définir la barre latérale

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


## Exemples

```md
## Installation

### Windows

### Linux

## Configuration
```
