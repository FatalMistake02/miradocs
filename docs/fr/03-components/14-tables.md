---
title: Tableaux
description: Affichez des tableaux Markdown avec recherche et styles par colonne.
---
Écrivez un tableau Markdown dans `table`. `search: true` ajoute une recherche dans l’en-tête et filtre les lignes en conservant les titres des colonnes. `align` accepte une valeur ou une liste par colonne : `start`, `center`, `end`, `left`, `right`. Masquez les lignes avec `columnDividers: false` et `rowDividers: false`, ou alternez les fonds avec `striped: true`. `title`, `placeholder` et `empty` règlent les textes. Les cellules acceptent liens, code et emphase. Les tableaux larges défilent dans leur conteneur. Personnalisez une instance avec une classe et les variables `--table-*`.

## Exemple

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

## Personnaliser

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
