---
title: Cartões
description: Apresente links relacionados em uma grade adaptável.
---
Coloque cada `card` dentro de `cards` e separe o título do destino com ` | `. O corpo aceita uma descrição em Markdown. Links internos respeitam `base`. Use `.cards` e `.content-card` para ajustar a grade e os cartões, ou classes de instância para mudanças específicas.

## Exemplo

:::cards {.guide-cards}
:::card Installation | /pt-BR/getting-started/installation/
Create a project and start your preview.
:::
:::card Theming | /pt-BR/guides/theming/
Change fonts, colors, and component styles.
:::
:::


## Adicionar cartões

```md
:::cards {.guide-cards}
:::card Installation | /getting-started/installation/
Create a project and start your preview.
:::
:::card A card without a link
Add supporting content here.
:::
:::
```


## Personalizar

```css title=theme/components.css
.guide-cards { gap: 20px; }
.guide-cards .content-card {
  padding: 24px;
  border-radius: 12px;
}
@media (min-width: 900px) {
  .guide-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```
