# create-miradocs

Create a minimal documentation project that depends on miradocs.

```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```

This command becomes available after npm registry publication. To test from this repository, run `node build.js` in this package and invoke `node bin/create-miradocs.js my-docs`.

The starter creates package.json, miradocs.config.json, docs/index.md, theme/tokens.css, and .gitignore. It refuses to overwrite a nonempty destination. The framework remains a dependency in node_modules.

Use `--install` to install dependencies after generation, `--title` to choose a site name, or `--miradocs-version` to test a local package tarball. No framework demos, repository source, GitHub settings, or miradocs branding are copied.
