---
title: Deployment
description: Generate static files for your chosen host.
---
## Build and upload

```sh
npm ci
npm run build
```

Upload the contents of `site/` to any static host. Configure the host to serve directory index files. No server runtime is required. Use its custom-error setting to serve `404.html` for missing pages.

## Subpaths

For a site mounted at `/handbook/`, set `base` to `/handbook/`. Navigation, assets, root-relative Markdown links, and images receive the prefix. The preview server also serves the configured path.

## Metadata

Set `site` to the public origin, such as `https://docs.example.com`. Builds then include canonical URLs, a sitemap, and robots.txt. Use `favicon` for a public asset and `editUrl` for a repository folder URL.

## Build behavior

Output is prepared in a temporary sibling directory and replaced only after the build succeeds. A failed build preserves the last output. Existing nonempty directories without a miradocs output marker are rejected. Public files cannot override generated assets, pages, or search indexes.

## Hosting options

Use the build command and output directory with a static hosting service, copy the output with your own deployment script, or serve it from a conventional web server. Package-manager scripts are conveniences; the CLI can be called directly with Node.js. The included GitHub Actions workflow checks the framework and builds documentation on supported operating systems.
