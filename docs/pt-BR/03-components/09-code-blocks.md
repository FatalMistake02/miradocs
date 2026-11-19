---
title: Blocos de código
description: Delimite o código com três crases e indique a linguagem após a abertura.
---
`title=arquivo` altera o rótulo exibido. Os blocos incluem realce de sintaxe, rolagem horizontal e botão de copiar. O conteúdo não é executado nem interpretado como componente. Personalize as variáveis de código e os seletores `.code-block`, `.code-top` e `pre`.

## Exemplo

```js title=example.js
const options = { theme: 'system' };
console.log(options);
```


## Adicionar um bloco de código

````md
```js title=example.js
const options = { theme: 'system' };
```
````


## Personalizar

```css title=theme/components.css
.code-block { border-radius: 14px; }
.code-block pre { font-size: 13px; line-height: 1.8; }
.code-top { padding: 12px 16px; }
```
