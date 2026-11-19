---
title: Conteúdo expansível
description: Use details para um conteúdo que o leitor pode abrir e fechar.
---
O texto da abertura vira o título; o corpo aceita Markdown e outros componentes. O controle usa o elemento nativo `details` e funciona com teclado. Personalize `.details`, `.details-title`, `.details-indicator` e `.details-content`, ou as variáveis de fundo, borda, raio e espaçamento.

## Exemplo

:::details Which files are generated?
The build writes pages, styles, scripts, and search indexes to `site/`.
:::

:::details Can I use my own styles?
Yes. Put CSS in your theme folder and add a class to target one instance. See [Theming](/pt-BR/guides/theming/).
:::


## Adicionar conteúdo expansível

```md
:::details Which files are generated? {.output-details}
The build writes pages, styles, scripts, and search indexes to `site/`.
:::
```


## Personalizar

```css title=theme/components.css
.output-details {
  --details-radius: 12px;
  --details-padding: 20px;
  --details-bg: var(--surface);
  --details-border: var(--border);
  --details-header-hover: var(--hover);
}
.output-details .details-content { font-size: 14px; }
```
