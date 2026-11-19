---
title: Configuración
description: Configura el sitio en miradocs.config.json.
---
Este archivo utiliza JSON estándar; la sintaxis simplificada solo se aplica a las opciones de componentes en Markdown. Define el título, las carpetas de origen y salida, los estilos, los enlaces y los idiomas. El esquema incluido añade ayuda y validación en editores compatibles. Las rutas de `styles` son relativas a `theme/`. Los comandos `dev`, `build` y `preview` sirven para trabajar, compilar y revisar el sitio. Usa `--config` para otro archivo y `--port` para cambiar el puerto. `miradocs:navigate` permite inicializar scripts tras navegar.

## Opciones

| Opción | Predeterminado | Uso |
| --- | --- | --- |
| `title` | `"Documentation"` | Nombre del sitio |
| `site` | — | Origen público para URL canónicas y sitemap |
| `base` | `"/"` | Prefijo de las URL |
| `logo` | — | Imagen de la cabecera |
| `favicon` | — | Icono de la pestaña del navegador |
| `links` | `[]` | Enlaces de la cabecera |
| `footer` | — | Texto al pie de la página |
| `editUrl` | — | URL de la carpeta del repositorio para editar páginas |
| `content` | `"docs"` | Carpeta de páginas Markdown |
| `output` | `"site"` | Carpeta de salida; separada de los archivos fuente |
| `theme` | `"theme"` | Carpeta de estilos propios |
| `components` | `"components"` | Carpeta de plantillas HTML |
| `public` | `"public"` | Archivos copiados sin cambios |
| `styles` | `[]` | Hojas de estilo, en orden, relativas a theme |
| `sidebar` | — | Grupos y enlaces; se genera con carpetas si se omite |
| `search` | `{}` | Opciones de búsqueda; false la desactiva |
| `language` | `"en"` | Idioma de un sitio con un solo idioma |
| `locales` | — | Idiomas, carpetas, etiquetas y dirección del texto |
| `clientNavigation` | `true` | Cambiar páginas sin recargar todo el documento |
| `strictLinks` | `true` | Detectar páginas, archivos y fragmentos internos ausentes |
| `markdown.html` | `false` | Permitir HTML directo en Markdown |
| `scripts` | `[]` | URL de módulos del navegador |
| `clientComponents` | `{}` | Componentes React, Vue, Svelte y módulos registrados |


## Configuración básica

```json title=miradocs.config.json
{
  "$schema": "./node_modules/miradocs/miradocs.schema.json",
  "title": "Project docs",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```


## Enlaces e iconos de cabecera

```json title=miradocs.config.json
{
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-name/your-project",
      "icon": "github",
      "newTab": true
    },
    {
      "label": "Community",
      "url": "https://example.com/community",
      "icon": "custom:/icons/community.svg"
    }
  ]
}
```


## Comandos

:::tabs Gestor de paquetes
:::tab npm
| Command | What it does |
| --- | --- |
| `npm run dev` | Build, watch your files, and refresh the preview |
| `npm run build` | Generate the production site |
| `npm run preview` | Build and preview without watching |
:::
:::tab pnpm
| Command | What it does |
| --- | --- |
| `pnpm run dev` | Build, watch your files, and refresh the preview |
| `pnpm run build` | Generate the production site |
| `pnpm run preview` | Build and preview without watching |
:::
:::tab Yarn
| Command | What it does |
| --- | --- |
| `yarn run dev` | Build, watch your files, and refresh the preview |
| `yarn run build` | Generate the production site |
| `yarn run preview` | Build and preview without watching |
:::
:::tab Bun
| Command | What it does |
| --- | --- |
| `bun run dev` | Build, watch your files, and refresh the preview |
| `bun run build` | Generate the production site |
| `bun run preview` | Build and preview without watching |
:::
:::

:::tabs Gestor de paquetes
:::tab npm
```sh
npx miradocs build --config miradocs.config.json
npx miradocs dev --port 8001
npx miradocs serve --port 8001
```
:::
:::tab pnpm
```sh
pnpm exec miradocs build --config miradocs.config.json
pnpm exec miradocs dev --port 8001
pnpm exec miradocs serve --port 8001
```
:::
:::tab Yarn
```sh
yarn exec miradocs build --config miradocs.config.json
yarn exec miradocs dev --port 8001
yarn exec miradocs serve --port 8001
```
:::
:::tab Bun
```sh
bunx --no-install miradocs build --config miradocs.config.json
bunx --no-install miradocs dev --port 8001
bunx --no-install miradocs serve --port 8001
```
:::
:::
