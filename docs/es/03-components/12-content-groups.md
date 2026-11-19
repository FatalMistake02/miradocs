---
title: Grupos de contenido
description: Usa group para aplicar una clase a una sección de Markdown.
---
Puede contener encabezados, imágenes, código u otros componentes. `{.mi-clase}` se añade al contenedor `.content-group` y permite cambiar solo ese contenido desde `theme/`. Los grupos pueden anidarse. No necesitas crear una plantilla HTML para añadir un contenedor de estilos.

## Añadir un grupo

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [Installation guide](/getting-started/installation/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```


## Ejemplo

:::group {.group-example}
### A grouped section

This paragraph and its [link](/es/guides/theming/) share one container.
:::


## Dar estilo a un elemento

```md
:::group {.diagram}
![Architecture](/images/architecture.svg)
:::
```

```css title=theme/components.css
.diagram img {
  max-width: 500px;
  border-radius: 16px;
}
```
