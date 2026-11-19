---
title: Grupos de conteúdo
description: Use group para aplicar uma classe a uma seção de Markdown.
---
O grupo pode conter títulos, imagens, código ou outros componentes. `{.minha-classe}` é adicionada ao contêiner `.content-group`, permitindo alterar apenas esse conteúdo a partir de `theme/`. Grupos podem ser aninhados. Não é necessário criar um modelo HTML para adicionar um contêiner de estilos.

## Adicionar um grupo

```md title=docs/example.md
:::group {.setup-section}
## Installation

Read the [Installation guide](/getting-started/installation/).

:::note Requirements {.requirements-note}
Install Node.js before continuing.
:::
:::
```

```css title=theme/components.css
.setup-section h2 { font-weight: 500; }
.setup-section a { text-decoration-color: var(--accent); }
.setup-section .requirements-note { border-radius: 12px; }
```


## Exemplo

:::group {.group-example}
### A grouped section

This paragraph and its [link](/pt-BR/guides/theming/) share one container.
:::


## Estilizar um elemento

```md
:::group {.diagram}
![Architecture](/images/architecture.svg)
:::
```

```css title=theme/components.css
.diagram img {
  max-width: 500px;
  border-radius: 16px;
}
```
