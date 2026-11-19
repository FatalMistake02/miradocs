---
title: Metadatos de página
description: Añade metadatos YAML entre líneas --- al principio del archivo.
---
`title` establece el nombre de la página y `description` su descripción. `order` modifica el orden, `search: false` excluye la página de la búsqueda y `draft: true` la oculta en compilaciones de producción. La vista previa de desarrollo incluye borradores. `layout: landing` elimina las barras laterales y `sidebar: false` excluye la página de la navegación automática. Conserva los nombres de las opciones tal como aparecen en los ejemplos.

## Opciones

| Opción | Predeterminado | Uso |
| --- | --- | --- |
| `title` | — | Título; usa el nombre del archivo si se omite |
| `description` | `""` | Introducción y descripción de metadatos |
| `layout` | `"docs"` | landing elimina las barras laterales |
| `order` | `0` | Orden anterior al orden por nombre de archivo |
| `draft` | `false` | Mostrar solo en desarrollo |
| `sidebar` | `true` | Incluir en la navegación y en los enlaces anterior/siguiente |
| `search` | `true` | Incluir en los resultados de búsqueda |


## Ejemplos

```md title=docs/example.md
---
title: Installation
description: Install the project and start a preview.
layout: docs
order: 1
draft: false
sidebar: true
search: true
---

## Requirements

Write your content here.
```


## Usos habituales

```yaml
---
title: My project
description: What the project does.
layout: landing
sidebar: false
---
```

```yaml
---
title: Upcoming changes
draft: true
---
```
