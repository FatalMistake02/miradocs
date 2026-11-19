---
title: Componentes personalizados
description: Crea una plantilla HTML reutilizable en components/.
---
El nombre del archivo se convierte en el nombre de la directiva. `{{title}}` recibe el título y `{{content}}` el cuerpo Markdown renderizado; incluye exactamente un marcador `{{content}}`. Las clases de instancia se añaden al elemento exterior. Guarda los estilos en `theme/`. Para comportamiento propio, añade un módulo a `scripts` e inicialízalo también tras `miradocs:navigate`. Los componentes con montaje y limpieza propios pueden registrarse como componentes de framework.

## Ejemplo

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::


## Crear una plantilla

```html title=components/example.html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

```md
:::example Release notes {.release-summary}
Add a short summary, a list of changes, or a link to the full release.
:::
```


## Añadir estilos

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```


## Añadir JavaScript

```json title=miradocs.config.json
{
  "scripts": ["/example.js"]
}
```

```js title=public/example.js
function initializeExample() {
  document.querySelectorAll(".feature-card").forEach(card => {
    if (card.dataset.initialized) return;
    card.dataset.initialized = "true";
    // Set up the behavior for this card.
  });
}

initializeExample();
document.addEventListener("miradocs:navigate", initializeExample);
```
