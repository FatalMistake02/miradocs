---
title: Páginas iniciais
description: Crie uma página de apresentação sem barras laterais.
---
Adicione `layout: landing` e `sidebar: false` aos metadados e escreva sua introdução, links e componentes em Markdown. Use um botão para começar e cartões para destacar as seções principais. Aplique classes a instâncias específicas e personalize-as em `theme/`; as páginas de documentação podem manter o layout normal.

## Definir o layout

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```


## Alterar a aparência

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```
