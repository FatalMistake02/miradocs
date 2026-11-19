---
title: Escrever conteúdo
description: Crie páginas em Markdown com metadados YAML.
---
Defina `title` e, se necessário, `description` no início do arquivo. Comece o corpo com `##`, pois o título já é exibido; use `###` para subseções. Você pode incluir links, imagens, tabelas, tarefas, notas de rodapé e componentes. Links para arquivos `.md` são convertidos em URLs. Guarde imagens e downloads em `public/`. A compilação detecta páginas, arquivos e âncoras internas inexistentes. Aprenda a sintaxe com o [tutorial do CommonMark](https://commonmark.org/help/tutorial/).

## Criar uma página

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

:::tabs Package manager
:::tab npm
```sh
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun install
bun run dev
```
:::
:::

:::note Production build
Run the `build` script to generate the finished site.
:::
````


## Adicionar links e imagens

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```


## Adicionar componentes

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::
