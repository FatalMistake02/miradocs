---
title: Blocs de code
description: >-
  Encadrez le code avec trois accents graves et indiquez le langage après
  l’ouverture.
---
`title=fichier` change l’étiquette affichée. Les blocs incluent coloration syntaxique, défilement horizontal et bouton de copie. Leur contenu n’est ni exécuté ni interprété comme composant. Personnalisez les variables du code et les sélecteurs `.code-block`, `.code-top` et `pre`.

## Exemple

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```


## Ajouter un bloc de code

````md
```js title=example.js
const options = { theme: 'system' };
```
````


## Personnaliser

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```
