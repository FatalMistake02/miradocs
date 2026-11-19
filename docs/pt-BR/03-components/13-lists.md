---
title: Listas
description: Agrupe entradas Markdown com list.
---
O título é opcional e `search: true` adiciona busca no cabeçalho. `columns` aceita de 1 a 6 colunas e reduz a quantidade quando falta espaço. `columnDividers: false` oculta as linhas verticais. `align: [start, end]` alinha cada coluna; também aceita `center`, `left`, `right` ou um único valor para todas. A busca ignora maiúsculas e acentos, mantém os itens aninhados juntos e reorganiza os resultados. `placeholder` e `empty` alteram as mensagens. Personalize a instância com uma classe e as variáveis `--list-*`.

## Opções

| Opção | Padrão | Uso |
| --- | --- | --- |
| `title` | — | Título opcional |
| `search` | `false` | Busca no cabeçalho |
| `columns` | `1` | Máximo de colunas: de 1 a 6 |
| `columnDividers` | `true` | Linhas verticais entre colunas |
| `align` | `"start"` | Alinhamento comum ou por coluna |
| `placeholder` | `"Pesquisar nesta lista…"` | Texto e rótulo do campo de busca |
| `empty` | `"Nenhum item correspondente."` | Mensagem quando não há resultados |


## Exemplo

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/pt-BR/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/pt-BR/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/pt-BR/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/pt-BR/guides/deployment/)  
  Build your site and put it online.
:::


## Adicionar uma lista

:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::

```md
:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::
```


## Adicionar busca

```md
:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/guides/deployment/)  
  Build your site and put it online.
:::
```


## Usar colunas

```md
:::list { title: Resources, columns: 2 }
- Installation
- Configuration
- Theming
- Deployment
:::
```

:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] } {.resource-list}
- Installation
- Configuration
- Theming
- Deployment
:::

```md
:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] }
- Installation
- Configuration
- Theming
- Deployment
:::
```


## Personalizar

```css title=theme/components.css
.guide-list {
  --list-bg: var(--bg);
  --list-border: var(--border);
  --list-radius: 10px;
  --list-padding: 20px;
  --list-column-min-width: 220px;
  --list-search-width: 220px;
  --list-column-divider: transparent;
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```
