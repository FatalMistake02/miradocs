---
title: Estrutura do projeto
description: Organize o site com arquivos e pastas.
---
As páginas ficam em `docs/`, os modelos HTML em `components/`, os estilos em `theme/` e os arquivos copiados sem alterações em `public/`. `miradocs.config.json` configura o site. Prefixos numéricos definem a ordem e não aparecem nas URLs. `index.md` representa a página da pasta. Não edite `site/`: cada compilação substitui seu conteúdo.

## Exemplos

:::file-tree Project
- docs/ — Markdown pages
  - index.md
  - 01-guides/
    - 01-installation.md
- theme/ — your styles
  - tokens.css
  - components.css
- components/ — reusable components
- public/ — images, fonts, and downloads
- miradocs.config.json
- package.json
- site/ — generated output
:::
