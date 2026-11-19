---
title: Instalação
description: Crie seu site e comece a escrever.
---
Use Node.js 20.19 ou mais recente; o site gerado é estático e a hospedagem não precisa de Node.js. Escolha seu gerenciador de pacotes, crie o projeto, instale as dependências e execute `dev`. A prévia é atualizada ao salvar. Escreva em `docs/`, personalize `theme/` e execute `build` para gerar `site/`.

## Criar o site

:::tabs Gerenciador de pacotes
:::tab npm
```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm create miradocs@latest my-docs
cd my-docs
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn dlx create-miradocs@latest my-docs
cd my-docs
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun create miradocs@latest my-docs
cd my-docs
bun install
bun run dev
```
:::
:::

:::file-tree my-docs
- docs/
  - index.md
- theme/
  - tokens.css
- miradocs.config.json
- package.json
- .gitignore
:::


## Escrever a primeira página

```md title=docs/index.md
---
title: Welcome
description: Documentation for my project.
---

## Get started

Add the instructions your readers need first.
```


## Compilar o site

:::tabs Gerenciador de pacotes
:::tab npm
```sh
npm run build
npm run preview
```
:::
:::tab pnpm
```sh
pnpm run build
pnpm run preview
```
:::
:::tab Yarn
```sh
yarn run build
yarn run preview
```
:::
:::tab Bun
```sh
bun run build
bun run preview
```
:::
:::
