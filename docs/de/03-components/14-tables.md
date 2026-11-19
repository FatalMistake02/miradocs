---
title: Tabellen
description: Markdown-Tabellen mit optionaler Suche und Spaltenstilen.
---
Schreibe eine Markdown-Tabelle in `table`. `search: true` ergänzt eine Suche im Kopfbereich und filtert Zeilen, während Spaltenüberschriften sichtbar bleiben. `align` akzeptiert einen Wert oder eine Liste pro Spalte: `start`, `center`, `end`, `left`, `right`. `columnDividers: false` und `rowDividers: false` verbergen Trennlinien. `striped: true` aktiviert abwechselnde Hintergründe. `title`, `placeholder` und `empty` bestimmen Texte. Zellen unterstützen Links, Code und Hervorhebungen. Breite Tabellen scrollen im Container. Instanzklassen und `--table-*`-Variablen ermöglichen eigene Stile.

## Beispiel

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

## Anpassen

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
