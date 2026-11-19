---
title: Deployment
description: Build your site and put it online.
---
miradocs generates static HTML, CSS, and JavaScript. You can upload the output to a static host or serve it from your own web server.

## Build and preview

Run these commands in your project:

```sh
npm run build
npm run preview
```

Check the preview before uploading the contents of `site/`.

## Configure your host

Use these settings on a service that builds from your repository:

| Setting | Value |
| --- | --- |
| Install command | `npm ci` when you have a committed npm lockfile |
| Build command | `npm run build` |
| Output directory | `site` |

Use the equivalent install and build commands if you use another package manager. For a manual deployment, upload the files already generated in `site/`.

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
