---
title: Deployment
description: Build once and bring your documentation to the host that works for you.
---
## Publish the output

Run `python -m miradocs build`, then upload the contents of `site/` to any static host. Configure your host to serve directory index files such as `guide/index.html`. No Python runtime is needed on the host.

```sh
python -m miradocs build
```

You can run that command in a CI pipeline, a container, or a local script. Python is the only build dependency; no particular package manager is required.

## Hosting under a path

Set `base` in `mira.json` to your mount path, for example `/handbook/`. Generated navigation and assets will use that prefix. Mount the output directory at that path on your host. The included preview server serves the output root and does not mount subpaths.

Content links written as root-relative URLs need the same prefix; Mira does not rewrite links in Markdown.
