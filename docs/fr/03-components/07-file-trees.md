---
title: Arborescences de fichiers
description: >-
  Affichez fichiers et dossiers avec une liste Markdown imbriquée dans
  file-tree.
---
L’indentation définit la hiérarchie ; une barre oblique finale indique un dossier vide. L’ordre écrit est conservé. Ajoutez une description avec ` — `. Les noms acceptent mise en forme et liens. `{ title: Projet, collapsed: true }` ferme les dossiers au départ. Les icônes dépendent du nom et de l’extension ; `icons` accepte vos images et `icons: false` utilise des icônes neutres. Les variables règlent l’indentation et les guides.

## Exemple

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


## Ajouter une arborescence

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


## Icônes de fichiers

```md
:::file-tree { title: Project, icons: { .mira: /icons/mira.svg, special.config: /icons/config.svg } }
- index.mira
- special.config
:::
```


## Personnaliser

```css title=theme/components.css
.file-tree {
  --tree-indent: 20px;
  --tree-row-height: 36px;
  --tree-guide: var(--border);
  --tree-icon: var(--muted);
}
.file-tree-description { font-size: 12px; }
```
