---
title: Métadonnées des pages
description: Ajoutez des métadonnées YAML entre des lignes --- au début du fichier.
---
`title` définit le nom et `description` la description de la page. `order` modifie l’ordre, `search: false` exclut la page de la recherche et `draft: true` la masque dans les générations de production. L’aperçu de développement inclut les brouillons. `layout: landing` supprime les barres latérales et `sidebar: false` retire la page de la navigation automatique. Conservez les noms d’options indiqués dans les exemples.

## Options

| Option | Valeur par défaut | Utilisation |
| --- | --- | --- |
| `title` | — | Titre ; nom du fichier si absent |
| `description` | `""` | Introduction et description des métadonnées |
| `layout` | `"docs"` | landing supprime les barres latérales |
| `order` | `0` | Ordre avant le tri par nom de fichier |
| `draft` | `false` | Afficher uniquement en développement |
| `sidebar` | `true` | Inclure dans la navigation et les liens précédent/suivant |
| `search` | `true` | Inclure dans les résultats de recherche |


## Exemples

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


## Usages courants

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
