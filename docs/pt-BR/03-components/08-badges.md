---
title: Selos
description: 'Use badge para um rótulo curto, como um status ou uma versão.'
---
Escreva o texto após o nome da diretiva. Deixe explicações longas no conteúdo da página. Personalize `.badge` ou adicione uma classe de instância para ajustar cores, borda e tipografia.

## Exemplo

:::badge Beta
:::


## Adicionar um selo

```md
:::badge Beta {.release-badge}
:::
```


## Personalizar

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
