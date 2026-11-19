---
title: Metadados de páginas
description: Adicione metadados YAML entre linhas --- no início do arquivo.
---
`title` define o nome e `description` a descrição da página. `order` altera a ordem, `search: false` exclui a página da busca e `draft: true` a omite na compilação de produção. A prévia de desenvolvimento inclui rascunhos. `layout: landing` remove as barras laterais e `sidebar: false` retira a página da navegação automática. Mantenha os nomes das opções como aparecem nos exemplos.

## Opções

| Opção | Padrão | Uso |
| --- | --- | --- |
| `title` | — | Título; usa o nome do arquivo quando omitido |
| `description` | `""` | Introdução e descrição dos metadados |
| `layout` | `"docs"` | landing remove as barras laterais |
| `order` | `0` | Ordem anterior à ordenação por nome do arquivo |
| `draft` | `false` | Exibir apenas em desenvolvimento |
| `sidebar` | `true` | Incluir na navegação e nos links anterior/próxima |
| `search` | `true` | Incluir nos resultados de busca |


## Exemplos

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


## Usos comuns

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
