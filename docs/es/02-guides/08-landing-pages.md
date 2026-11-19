---
title: Páginas de inicio
description: Crea una página de presentación sin barras laterales.
---
Añade `layout: landing` y `sidebar: false` a sus metadatos. Después escribe tu introducción, enlaces y componentes en Markdown. Puedes usar botones para empezar y tarjetas para presentar las secciones principales. Aplica clases a instancias concretas y personalízalas desde `theme/`; las páginas de documentación pueden conservar su diseño habitual.

## Definir el diseño

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```


## Cambiar el aspecto

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```
