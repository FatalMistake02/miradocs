---
title: Listas
description: Agrupa entradas Markdown con list.
---
El título es opcional y `search: true` añade búsqueda en la cabecera. `columns` admite de 1 a 6 columnas y reduce su número cuando falta espacio. `columnDividers: false` oculta las líneas verticales. `align: [start, end]` alinea cada columna; también puedes usar `center`, `left` y `right`, o un único valor para todas. La búsqueda ignora mayúsculas y acentos, conserva los elementos anidados y recoloca los resultados. `placeholder` y `empty` cambian los mensajes. Personaliza la instancia con una clase y las variables `--list-*`.

## Opciones

| Opción | Predeterminado | Uso |
| --- | --- | --- |
| `title` | — | Título opcional |
| `search` | `false` | Búsqueda en la cabecera |
| `columns` | `1` | Máximo de columnas: de 1 a 6 |
| `columnDividers` | `true` | Líneas verticales entre columnas |
| `align` | `"start"` | Alineación común o por columna |
| `placeholder` | `"Buscar en esta lista…"` | Texto y etiqueta del campo de búsqueda |
| `empty` | `"No hay elementos coincidentes."` | Mensaje cuando no hay coincidencias |


## Ejemplo

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/es/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/es/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/es/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/es/guides/deployment/)  
  Build your site and put it online.
:::


## Añadir una lista

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


## Añadir búsqueda

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


## Usar columnas

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
