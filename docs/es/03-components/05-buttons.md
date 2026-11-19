---
title: Botones
description: Da a un enlace de navegación el aspecto de un botón con button.
---
Escribe la etiqueta y la URL separadas por ` | ` y cierra el componente con `:::`. Sigue siendo un enlace: úsalo para navegar. Añade una clase de instancia y personaliza `.action-button` desde tus hojas de estilo.

## Ejemplo

:::button Get started | /es/getting-started/installation/
:::


## Añadir un botón

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```


## Personalizar

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```
