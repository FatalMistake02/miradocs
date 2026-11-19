---
title: Tabelas
description: Exiba tabelas Markdown com busca opcional e estilos por coluna.
---
Escreva uma tabela Markdown dentro de `table`. `search: true` adiciona busca no cabeçalho e filtra as linhas sem ocultar os títulos das colunas. `align` aceita um valor ou uma lista por coluna: `start`, `center`, `end`, `left`, `right`. Use `columnDividers: false` e `rowDividers: false` para ocultar linhas divisórias, ou `striped: true` para alternar os fundos. `title`, `placeholder` e `empty` definem os textos. As células aceitam links, código e ênfase. Tabelas largas rolam dentro do contêiner. Personalize uma instância com uma classe e variáveis `--table-*`.

## Exemplo

:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::

## Markdown

```md
:::table { title: Components, search: true, columnDividers: false, align: [start, start, end] } {.component-table}
| Component | Use | Search |
| --- | --- | --- |
| **Lists** | Group resources and reference entries | Optional |
| **Tables** | Compare entries with shared fields | Optional |
| **Tabs** | Switch between related examples | — |
| **File trees** | Show files and folders | — |
:::
```

## Personalizar

```css title=theme/components.css
.component-table {
  --table-bg: var(--bg);
  --table-header-bg: var(--surface);
  --table-border: var(--border);
  --table-radius: 10px;
  --table-cell-padding: 12px 20px;
  --table-stripe-bg: var(--hover);
}
.component-table th { font-weight: 500; }
.component-table td:last-child { color: var(--muted); }
```
