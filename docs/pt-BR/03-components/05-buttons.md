---
title: Botões
description: Dê a um link de navegação a aparência de um botão com button.
---
Separe o rótulo e a URL com ` | ` e feche o componente com `:::`. O elemento continua sendo um link: use-o para navegação. Adicione uma classe de instância e personalize `.action-button` nas suas folhas de estilo.

## Exemplo

:::button Get started | /pt-BR/getting-started/installation/
:::


## Adicionar um botão

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```


## Personalizar

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```
