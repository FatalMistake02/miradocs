---
title: Árboles de archivos
description: >-
  Muestra archivos y carpetas con una lista Markdown anidada dentro de
  file-tree.
---
La sangría crea la jerarquía y una barra final marca una carpeta vacía. Se conserva el orden escrito. Añade una descripción con ` — `. Los nombres admiten formato y enlaces. Usa `{ title: Proyecto, collapsed: true }` para cerrar las carpetas inicialmente. Los iconos dependen del nombre y la extensión; `icons` permite imágenes propias y `icons: false` utiliza iconos neutros. Ajusta la sangría y las guías con las variables del componente.

## Ejemplo

:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::


## Añadir un árbol de archivos

```md
:::file-tree Project
- docs/
  - index.md — Home page
  - guides/
    - installation.md
- components/
  - Counter.jsx
  - App.vue
  - App.svelte
- public/
  - logo.svg
- package.json
- tsconfig.json
- .gitignore
- **miradocs.config.json** — Site settings
:::
```

```md
:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::
```

:::file-tree { title: Project, collapsed: true }
- docs/
  - index.md
- theme/
  - tokens.css
:::


## Iconos de archivos

```md
:::file-tree { title: Project, icons: { .mira: /icons/mira.svg, special.config: /icons/config.svg } }
- index.mira
- special.config
:::
```


## Personalizar

```css title=theme/components.css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```
