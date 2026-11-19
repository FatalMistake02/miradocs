---
title: Structure du projet
description: Organisez le site avec des fichiers et des dossiers.
---
Placez les pages dans `docs/`, les modèles HTML dans `components/`, les styles dans `theme/` et les fichiers à copier tels quels dans `public/`. `miradocs.config.json` configure le site. Les préfixes numériques déterminent l’ordre des pages sans apparaître dans les URL. `index.md` représente la page de son dossier. Ne modifiez pas `site/` : son contenu est remplacé à chaque génération.

## Exemples

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
