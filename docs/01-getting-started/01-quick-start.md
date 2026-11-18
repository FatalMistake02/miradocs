---
title: Installation
description: Install, preview, and build a documentation site.
---
## Requirements

Node.js 20.19 or later is required to build a site. The generated HTML, CSS, and JavaScript do not require Node.js on the host.

## Install from this repository

Clone the repository, enter its directory, and install dependencies:

```sh
npm ci
```

The repository includes the miradocs source and its documentation. To preview that documentation:

```sh
npm run dev
```

Open [localhost:8000](http://localhost:8000). The preview watches content, configuration, styles, and components. Changes rebuild the site and reload the page. A failed build displays the error and leaves the previous output available.

## Create documentation

Run these commands from the repository directory:

```sh
node bin/miradocs.js init ../my-docs
node bin/miradocs.js dev --config ../my-docs/miradocs.config.json
```

The first command creates a content folder, configuration file, and theme. Existing files are protected from overwriting. The second command previews the new site.

## Write your first page

Follow [Writing content](/guides/writing-content/) for a complete Markdown file, or copy one of the [Page examples](/guides/page-examples/).

## Build static output

For the included documentation:

```sh
npm run build
```

For another project:

```sh
node bin/miradocs.js build --config ../my-docs/miradocs.config.json
```

Upload the generated `site/` directory to a static host. See [Deployment](/guides/deployment/) for subpaths and metadata.

## Use another package manager

The scripts work with npm, pnpm, yarn, or Bun after installing the dependencies. You can also call `node bin/miradocs.js` directly. The package can be installed from this repository or a locally generated tarball; it has not been published to the npm registry.
