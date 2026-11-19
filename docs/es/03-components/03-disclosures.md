---
title: Contenido desplegable
description: Usa details para contenido que el lector puede abrir y cerrar.
---
El texto de la apertura es el título; el cuerpo admite Markdown y otros componentes. El control utiliza el elemento nativo `details` y funciona con teclado. Personaliza `.details`, `.details-title`, `.details-indicator` y `.details-content`, o sus variables de fondo, borde, radio y espacio interior.

## Ejemplo

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/es/guides/theming/).
:::


## Añadir contenido desplegable

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```


## Personalizar

```css title=theme/components.css
.output-details {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-border: var(--border);
  --details-header-hover: var(--hover);
}
.output-details .details-content { font-size: 14px; }
```
