---
title: Publicação do site
description: Compile o site e publique em uma hospedagem estática.
---
Execute `build` e confira o resultado com `preview`. Publique o conteúdo de `site/`; o servidor deve usar `index.html` para URLs de diretórios e `404.html` como página de erro. Se a hospedagem compilar a partir do Git, inclua o arquivo de lock e configure os comandos do seu gerenciador de pacotes. Defina `base` para um subcaminho e `site` para gerar URLs canônicas e o sitemap. Uma compilação com erro preserva a saída anterior.

## Compilar e visualizar

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


## Configurar a hospedagem

:::tabs Gerenciador de pacotes
:::tab npm
| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `site` |
:::
:::tab pnpm
| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm run build` |
| Output directory | `site` |
:::
:::tab Yarn
| Setting | Value |
| --- | --- |
| Install command | `yarn install --immutable` |
| Build command | `yarn run build` |
| Output directory | `site` |
:::
:::tab Bun
| Setting | Value |
| --- | --- |
| Install command | `bun install --frozen-lockfile` |
| Build command | `bun run build` |
| Output directory | `site` |
:::
:::

```json title=miradocs.config.json
{
  "site": "https://example.com",
  "base": "/handbook/"
}
```
