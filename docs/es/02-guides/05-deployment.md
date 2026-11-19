---
title: Publicación del sitio
description: Compila el sitio y súbelo a un alojamiento estático.
---
Ejecuta `build` y comprueba el resultado con `preview`. Publica el contenido de `site/`; el servidor debe servir `index.html` para las URL de carpetas y usar `404.html` como página de error. Si el alojamiento compila desde Git, guarda el archivo de bloqueo y configura los comandos de tu gestor de paquetes. Define `base` para publicar bajo una subruta y `site` para generar URL canónicas y el mapa del sitio. Una compilación fallida conserva el resultado anterior.

## Compilar y revisar

:::tabs Gestor de paquetes
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


## Configurar el alojamiento

:::tabs Gestor de paquetes
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
