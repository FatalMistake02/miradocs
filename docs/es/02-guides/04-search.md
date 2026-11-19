---
title: Búsqueda
description: La búsqueda está incluida y carga su índice cuando se abre por primera vez.
---
Usa Ctrl K en Windows y Linux, o ⌘ K en macOS. Las flechas recorren los resultados, Intro abre la página y Esc cierra el cuadro. Configura `search.limit` y `search.threshold`; `search: false` desactiva la búsqueda del sitio. En los metadatos de una página, `search: false` la excluye del índice. Cada idioma tiene su propio índice. Las etiquetas y los estilos se pueden personalizar.

## Configurar resultados

```json title=miradocs.config.json
{
  "search": {
    "limit": 10,
    "threshold": 0.35
  }
}
```

```yaml
---
title: Internal notes
search: false
---
```
