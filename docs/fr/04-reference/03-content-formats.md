---
title: Formats de contenu
description: Les pages sont des fichiers .md avec des métadonnées YAML.
---
Markdown accepte tableaux, tâches, notes de bas de page, liens automatiques et composants. Le site utilise JSON pour la configuration, HTML pour les modèles, CSS pour les styles et JavaScript pour les comportements facultatifs. Pour JSX, Vue ou Svelte, enregistrez un composant de framework : ce ne sont pas des formats de page. Les blocs de code affichent leur contenu sans l’exécuter. Le HTML dans Markdown nécessite `markdown.html: true`. Consultez le [guide Markdown](https://www.markdownguide.org/extended-syntax/) pour la syntaxe.

## Métadonnées des pages

```md title=docs/example.md
---
title: "Install: Windows"
description: Set up the project on Windows.
draft: false
---

## Requirements

Write the page content here.
```


## HTML

```json title=miradocs.config.json
{
  "markdown": { "html": true }
}
```

```md
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.
```


## Exemples de code

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````
