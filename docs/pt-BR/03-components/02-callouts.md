---
title: Avisos
description: 'Destaque informações com note, tip, caution ou danger.'
---
O título é opcional e o corpo aceita Markdown. Escolha o tipo pelo significado da mensagem. Personalize `.callout`, `.callout-title` e `--callout-color`, ou adicione uma classe a uma instância específica.

## Exemplos

:::note
Your theme styles load after the default CSS.
:::

:::tip
Add a class to style one component without changing the others.
:::

:::caution
Changes made directly in `site/` are replaced by the next build.
:::

:::danger
Deleting your source folder removes the pages used to build the site.
:::


## Adicionar um aviso

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```


## Personalizar

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```
