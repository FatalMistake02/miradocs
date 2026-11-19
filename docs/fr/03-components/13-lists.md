---
title: Listes
description: Regroupez des entrées Markdown avec list.
---
Le titre est facultatif et `search: true` ajoute une recherche dans l’en-tête. `columns` accepte de 1 à 6 colonnes et en réduit le nombre quand l’espace manque. `columnDividers: false` masque les lignes verticales. `align: [start, end]` aligne chaque colonne ; vous pouvez aussi utiliser `center`, `left`, `right`, ou une seule valeur pour toutes. La recherche ignore casse et accents, conserve les éléments imbriqués et réorganise les résultats. `placeholder` et `empty` modifient les messages. Personnalisez l’instance avec une classe et les variables `--list-*`.

## Options

| Option | Valeur par défaut | Utilisation |
| --- | --- | --- |
| `title` | — | Titre facultatif |
| `search` | `false` | Recherche dans l’en-tête |
| `columns` | `1` | Nombre maximal de colonnes : de 1 à 6 |
| `columnDividers` | `true` | Lignes verticales entre les colonnes |
| `align` | `"start"` | Alignement commun ou par colonne |
| `placeholder` | `"Rechercher dans cette liste…"` | Texte et libellé du champ de recherche |
| `empty` | `"Aucun élément correspondant."` | Message sans résultat |


## Exemple

:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/fr/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/fr/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/fr/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/fr/guides/deployment/)  
  Build your site and put it online.
:::


## Ajouter une liste

:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::

```md
:::list Requirements
- Node.js 20.19 or newer
- A text editor
- A folder for your documentation
:::
```


## Ajouter une recherche

```md
:::list { title: Guides, search: true, columns: 2, placeholder: Find a guide… } {.guide-list}
- [Installation](/getting-started/installation/)  
  Create a project and start the local preview.
- [Writing content](/guides/writing-content/)  
  Add pages, links, images, and components.
- [Theming](/guides/theming/)  
  Change fonts, colors, and component styles.
- [Deployment](/guides/deployment/)  
  Build your site and put it online.
:::
```


## Utiliser des colonnes

```md
:::list { title: Resources, columns: 2 }
- Installation
- Configuration
- Theming
- Deployment
:::
```

:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] } {.resource-list}
- Installation
- Configuration
- Theming
- Deployment
:::

```md
:::list { title: Resources, columns: 2, columnDividers: false, align: [start, end] }
- Installation
- Configuration
- Theming
- Deployment
:::
```


## Personnaliser

```css title=theme/components.css
.guide-list {
  --list-bg: var(--bg);
  --list-border: var(--border);
  --list-radius: 10px;
  --list-padding: 20px;
  --list-column-min-width: 220px;
  --list-search-width: 220px;
  --list-column-divider: transparent;
}
.guide-list .list-title { font-size: 16px; }
.guide-list .list-content a { text-decoration-color: var(--accent); }
```
