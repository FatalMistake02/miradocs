---
title: Navegación
description: Las carpetas crean grupos y los archivos crean páginas en la barra lateral.
---
Los prefijos numéricos controlan el orden sin cambiar los títulos. Usa `sidebar` para definir grupos, páginas y enlaces externos de forma explícita; `collapsed` cierra un grupo inicialmente. El título de la página proviene de sus metadatos. El índice de la derecha sigue los encabezados de nivel dos a seis. La navegación entre páginas actualiza la URL sin recargar todo el documento; `clientNavigation: false` permite usar cargas completas.

## Ejemplos

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::


## Definir la barra lateral

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


## Ejemplos

```md
## Installation

### Windows

### Linux

## Configuration
```
