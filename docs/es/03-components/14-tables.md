---
title: Tablas
description: Muestra tablas Markdown con búsqueda opcional y estilos por columna.
---
Escribe una tabla Markdown dentro de `table`. `search: true` añade búsqueda en la cabecera y filtra las filas sin ocultar los encabezados. `align` acepta una alineación o una lista por columna: `start`, `center`, `end`, `left` y `right`. Puedes ocultar las líneas con `columnDividers: false` y `rowDividers: false`, o alternar fondos con `striped: true`. `title`, `placeholder` y `empty` controlan los textos. Las celdas admiten enlaces, código y énfasis. Las tablas anchas se desplazan dentro del contenedor. Usa una clase de instancia y variables `--table-*` para personalizar el diseño.

## Ejemplo

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
