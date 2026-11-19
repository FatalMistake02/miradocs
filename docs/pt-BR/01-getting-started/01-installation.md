---
title: Instalação
description: Crie seu site e comece a escrever.
---
Use Node.js 20.19 ou mais recente; o site gerado é estático e a hospedagem não precisa de Node.js. Escolha seu gerenciador de pacotes, crie o projeto, instale as dependências e execute `dev`. A prévia é atualizada ao salvar. Escreva em `docs/`, personalize `theme/` e execute `build` para gerar `site/`. Os pacotes ainda não foram publicados: até o primeiro lançamento, use o pacote local mostrado abaixo.

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

:::note Antes do primeiro lançamento
Os pacotes npm ainda não foram publicados. Use o pacote local até que estejam disponíveis.
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


## Usar um pacote local

```sh
npm ci
npm pack
node packages/create-miradocs/build.js
```

```sh
node packages/create-miradocs/bin/create-miradocs.js ../my-docs --miradocs-version file:/absolute/path/to/miradocs-1.0.0.tgz
cd ../my-docs
```

:::tabs Gerenciador de pacotes
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
