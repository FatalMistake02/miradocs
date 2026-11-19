---
title: Etapas
description: Apresente instruções em uma sequência numerada.
---
Coloque títulos de nível três (`###`) dentro de `steps`: cada título inicia uma etapa e aparece também no índice da página. As etapas podem conter Markdown e componentes. Um novo bloco recomeça em um. Personalize `.steps` e `.steps h3::before` para alterar os números e o espaçamento.

## Exemplo

:::steps
### Install dependencies
Install dependencies using your [package manager](/pt-BR/getting-started/installation/).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::


## Adicionar etapas

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
:::
```


## Personalizar

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
