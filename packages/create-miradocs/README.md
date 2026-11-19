# create-miradocs

Create a documentation site with your own content, configuration, and theme styles.

```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```

The command becomes available after npm publication. Before then, follow the repository's [local package setup](../../docs/01-getting-started/01-installation.md#use-a-local-package).

The starter creates `package.json`, `miradocs.config.json`, `docs/index.md`, `theme/tokens.css`, and `.gitignore`. The destination must be empty. miradocs is installed as a dependency.

Use `--install` to install dependencies after generation, `--title` to choose a site name, or `--miradocs-version` to use a local framework tarball.
