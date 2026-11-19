---
title: Usar componentes
description: Adicione componentes diretamente ao Markdown.
---
Escreva `:::nome`, o conteúdo e o fechamento `:::` em linhas separadas. Componentes com opções aceitam objetos como `{ title: Guias, search: true }`: chaves e textos simples não precisam de aspas. Separe as opções com vírgulas e coloque um espaço após cada dois-pontos. Use aspas em textos com vírgulas ou sinais especiais. JSON continua funcionando. Acrescente `{.minha-classe}` para personalizar uma única instância.

:::cards
:::card Abas | /pt-BR/components/tabs/
:::
:::card Avisos | /pt-BR/components/callouts/
:::
:::card Conteúdo expansível | /pt-BR/components/disclosures/
:::
:::card Cartões | /pt-BR/components/cards/
:::
:::card Botões | /pt-BR/components/buttons/
:::
:::card Etapas | /pt-BR/components/steps/
:::
:::card Árvores de arquivos | /pt-BR/components/file-trees/
:::
:::card Selos | /pt-BR/components/badges/
:::
:::card Blocos de código | /pt-BR/components/code-blocks/
:::
:::card Componentes personalizados | /pt-BR/components/custom-components/
:::
:::card Componentes de frameworks | /pt-BR/components/framework-components/
:::
:::card Grupos de conteúdo | /pt-BR/components/content-groups/
:::
:::card Listas | /pt-BR/components/lists/
:::
:::

## Exemplos

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

```md
:::list { title: Guides, search: true, columns: 2 }
- Installation
- Theming
:::
```

```md
:::list { title: "Setup: Windows, macOS, and Linux", search: true }
- Installation
- Configuration
:::
```
