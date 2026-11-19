---
title: Configuração
description: Configure o site em miradocs.config.json.
---
O arquivo usa JSON padrão; a sintaxe simplificada vale apenas para opções de componentes no Markdown. Defina título, pastas de origem e saída, estilos, links e idiomas. O esquema incluído oferece preenchimento e validação em editores compatíveis. Os caminhos em `styles` são relativos a `theme/`. Os comandos `dev`, `build` e `preview` servem para desenvolver, compilar e revisar. Use `--config` para outro arquivo e `--port` para alterar a porta. `miradocs:navigate` permite inicializar scripts após navegar.

## Opções

| Opção | Padrão | Uso |
| --- | --- | --- |
| `title` | `"Documentation"` | Nome do site |
| `site` | — | Origem pública para URLs canônicas e sitemap |
| `base` | `"/"` | Prefixo das URLs |
| `logo` | — | Imagem do cabeçalho |
| `favicon` | — | Ícone da aba do navegador |
| `links` | `[]` | Links do cabeçalho |
| `footer` | — | Texto no rodapé |
| `editUrl` | — | URL da pasta do repositório para editar páginas |
| `content` | `"docs"` | Pasta de páginas Markdown |
| `output` | `"site"` | Pasta de saída, separada dos arquivos de origem |
| `theme` | `"theme"` | Pasta de estilos próprios |
| `components` | `"components"` | Pasta de modelos HTML |
| `public` | `"public"` | Arquivos copiados sem alterações |
| `styles` | `[]` | Folhas de estilo em ordem, relativas a theme |
| `sidebar` | — | Grupos e links; gerados a partir das pastas quando omitido |
| `search` | `{}` | Opções de busca; false desativa |
| `language` | `"en"` | Idioma de um site com um único idioma |
| `locales` | — | Idiomas, pastas, rótulos e direção do texto |
| `clientNavigation` | `true` | Trocar páginas sem recarregar o documento inteiro |
| `strictLinks` | `true` | Detectar páginas, arquivos e âncoras internas ausentes |
| `markdown.html` | `false` | Permitir HTML direto no Markdown |
| `scripts` | `[]` | URLs de módulos do navegador |
| `clientComponents` | `{}` | Componentes React, Vue, Svelte e módulos registrados |


## Configuração básica

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


## Links e ícones do cabeçalho

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

:::tabs Gerenciador de pacotes
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

:::tabs Gerenciador de pacotes
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
