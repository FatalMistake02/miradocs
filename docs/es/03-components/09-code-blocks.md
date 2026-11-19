---
title: Bloques de código
description: >-
  Escribe código entre líneas de tres acentos graves y añade el lenguaje después
  de la apertura.
---
`title=archivo` cambia la etiqueta mostrada. Los bloques incluyen resaltado de sintaxis, desplazamiento horizontal y un botón para copiar. El contenido de un bloque no se ejecuta ni se interpreta como componente. Usa las variables de código y los selectores `.code-block`, `.code-top` y `pre` para personalizarlo.

## Ejemplo

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```


## Añadir código

````md
```js title=example.js
const options = { theme: 'system' };
```
````


## Personalizar

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```
