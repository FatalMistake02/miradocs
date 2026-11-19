---
title: Navegação
description: As pastas criam grupos e os arquivos criam páginas na barra lateral.
---
Prefixos numéricos controlam a ordem sem alterar os títulos. Use `sidebar` para definir grupos, páginas e links externos explicitamente; `collapsed` deixa um grupo fechado inicialmente. O título vem dos metadados da página. O índice acompanha os títulos de nível dois a seis. A navegação atualiza a URL sem recarregar o documento inteiro; `clientNavigation: false` permite carregamentos completos.

## Exemplos

:::file-tree docs
- 01-guides/
  - 01-installation.md
  - 02-configuration.md
- 02-reference/
  - index.md
:::


## Definir a barra lateral

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


## Exemplos

```md
## Installation

### Windows

### Linux

## Configuration
```
