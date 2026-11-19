---
title: Insignias
description: 'Usa badge para una etiqueta breve, como un estado o una versión.'
---
El texto se escribe después del nombre de la directiva. Evita explicaciones largas dentro de la insignia. Personaliza `.badge` o añade una clase de instancia para cambiar colores, borde y tipografía.

## Ejemplo

:::badge Beta
:::


## Añadir una insignia

```md
:::badge Beta {.release-badge}
:::
```


## Personalizar

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
