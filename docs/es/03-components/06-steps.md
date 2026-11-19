---
title: Pasos
description: Presenta instrucciones como una secuencia numerada.
---
Pon encabezados de nivel tres (`###`) dentro de `steps`; cada uno inicia un paso y también aparece en el índice de la página. Puedes incluir Markdown y componentes en cada paso. Un nuevo bloque empieza de nuevo por uno. Personaliza `.steps` y `.steps h3::before` para cambiar los números y el espacio.

## Ejemplo

:::steps
### Install dependencies
Install dependencies using your [package manager](/es/getting-started/installation/).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::


## Añadir pasos

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
:::
```


## Personalizar

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
