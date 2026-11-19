---
title: Usar componentes
description: Añade componentes directamente en Markdown.
---
Escribe la apertura `:::nombre`, el contenido y el cierre `:::` en líneas separadas. Los componentes con opciones aceptan objetos como `{ title: Guías, search: true }`: las claves y el texto sencillo no necesitan comillas. Separa las opciones con comas y deja un espacio después de cada dos puntos. Usa comillas para texto con comas o signos especiales. JSON también funciona. Añade `{.mi-clase}` para personalizar una sola instancia.

:::cards
:::card Pestañas | /es/components/tabs/
:::
:::card Avisos | /es/components/callouts/
:::
:::card Contenido desplegable | /es/components/disclosures/
:::
:::card Tarjetas | /es/components/cards/
:::
:::card Botones | /es/components/buttons/
:::
:::card Pasos | /es/components/steps/
:::
:::card Árboles de archivos | /es/components/file-trees/
:::
:::card Insignias | /es/components/badges/
:::
:::card Bloques de código | /es/components/code-blocks/
:::
:::card Componentes personalizados | /es/components/custom-components/
:::
:::card Componentes de frameworks | /es/components/framework-components/
:::
:::card Grupos de contenido | /es/components/content-groups/
:::
:::card Listas | /es/components/lists/
:::
:::

## Ejemplos

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

```md
:::list { title: Guides, search: true, columns: 2 }
- Installation
- Theming
:::
```

```md
:::list { title: "Setup: Windows, macOS, and Linux", search: true }
- Installation
- Configuration
:::
```
