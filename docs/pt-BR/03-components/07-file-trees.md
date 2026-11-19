---
title: Árvores de arquivos
description: Mostre arquivos e pastas com uma lista Markdown aninhada em file-tree.
---
A indentação define a hierarquia e uma barra final indica uma pasta vazia. A ordem escrita é preservada. Adicione descrições com ` — `. Os nomes aceitam formatação e links. Use `{ title: Projeto, collapsed: true }` para iniciar com as pastas fechadas. Os ícones dependem do nome e da extensão; `icons` aceita imagens próprias e `icons: false` usa ícones neutros. Ajuste a indentação e as linhas com as variáveis do componente.

## Exemplo

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


## Adicionar uma árvore de arquivos

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


## Ícones de arquivos

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
