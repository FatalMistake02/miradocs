---
title: Estructura del proyecto
description: Organiza el sitio con archivos y carpetas.
---
Las páginas van en `docs/`, las plantillas HTML en `components/`, los estilos en `theme/` y los archivos que se copian sin cambios en `public/`. `miradocs.config.json` configura el sitio. Los prefijos numéricos ordenan las páginas y desaparecen de las URL. `index.md` representa la página de su carpeta. No edites `site/`: cada compilación sustituye su contenido.

## Ejemplos

:::file-tree Project
- docs/ — Markdown pages
  - index.md
  - 01-guides/
    - 01-installation.md
- theme/ — your styles
  - tokens.css
  - components.css
- components/ — reusable components
- public/ — images, fonts, and downloads
- miradocs.config.json
- package.json
- site/ — generated output
:::
