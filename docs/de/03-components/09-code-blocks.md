---
title: Codeblöcke
description: >-
  Umschließe Code mit drei Graviszeichen und gib nach der öffnenden Zeile die
  Sprache an.
---
`title=datei` ändert die angezeigte Beschriftung. Codeblöcke bieten Syntaxhervorhebung, horizontales Scrollen und einen Kopierbutton. Ihr Inhalt wird weder ausgeführt noch als Komponente interpretiert. Codevariablen sowie `.code-block`, `.code-top` und `pre` bestimmen die Darstellung.

## Beispiel

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```


## Codeblock hinzufügen

````md
```js title=example.js
const options = { theme: 'system' };
```
````


## Anpassen

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```
