---
title: Deployment
description: Build once and bring your documentation to the host that works for you.
---
## Publish the output

Run `npm run build`, then upload the contents of `site/` to any static host. Configure your host to serve directory index files such as `guide/index.html`. No server runtime is needed on the host.

```sh
npm run build
```

You can run that command in a CI pipeline, a container, or a local script with Node.js and the project dependencies installed.

## Hosting under a path

Set `base` in `miradocs.config.json` to your mount path, for example `/handbook/`. Generated navigation and assets will use that prefix. Mount the output directory at that path on your host. The preview server also serves the configured base path.

Content links written as root-relative URLs need the same prefix; miradocs does not rewrite links in Markdown.

