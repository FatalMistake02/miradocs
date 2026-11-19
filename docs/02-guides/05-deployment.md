---
title: Deployment
description: Build your site and put it online.
---
miradocs generates static HTML, CSS, and JavaScript. You can upload the output to a static host or serve it from your own web server.

## Build and preview

Run these commands in your project:

:::tabs Package manager
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

Check the preview before uploading the contents of `site/`.

## Configure your host

Use these settings on a service that builds from your repository:

:::tabs Package manager
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

Commit your package manager’s lockfile before using these install commands. The Yarn example uses Yarn 2 or newer. For a manual deployment, upload the files already generated in `site/`.

Your host should serve `index.html` for directory URLs. Configure its custom 404 page to use `404.html`.

### Deploy under a subpath

If the site lives at `https://example.com/handbook/`, set `base`:

```json title=miradocs.config.json
{
  "site": "https://example.com",
  "base": "/handbook/"
}
```

Navigation, assets, and root-relative Markdown links receive the `/handbook/` prefix. The local preview uses the same path.

### Set the site URL

Set `site` to your public origin, such as `https://docs.example.com`. Builds then include canonical URLs, a sitemap, and `robots.txt`.

## If a build fails

Read the reported filename and error. Missing internal links, missing assets, duplicate page URLs, and invalid configuration stop the build. The last successful output is kept until a new build succeeds.

Keep your source files outside `site/`; a successful build replaces its contents.
