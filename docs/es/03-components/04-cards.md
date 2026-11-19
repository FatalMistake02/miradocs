---
title: Tarjetas
description: Presenta enlaces relacionados en una cuadrícula adaptable.
---
Coloca cada `card` dentro de `cards` y escribe el título y el destino separados por ` | `. El cuerpo admite una descripción en Markdown. Los enlaces internos respetan `base`. Usa `.cards` y `.content-card` para ajustar la cuadrícula y las tarjetas, o clases de instancia para cambios concretos.

## Ejemplo

:::cards {.guide-cards}
:::card Installation | /es/getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /es/guides/theming/
Change fonts, colors, and component styles.
:::
:::


## Añadir tarjetas

```md
:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card A card without a link
Add supporting content here.
:::
:::
```


## Personalizar

```css title=theme/components.css
.guide-cards { gap: 20px; }
.guide-cards .content-card {
  padding: 24px;
  border-radius: 12px;
}
@media (min-width: 900px) {
  .guide-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```
