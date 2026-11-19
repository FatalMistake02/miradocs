# miradocs

A static documentation framework built in JavaScript. Write pages in Markdown, organize navigation with folders, and customize the interface through CSS variables and reusable components.

Requires Node.js 20.19 or newer.

Create a documentation site with the separate `create-miradocs` package. After registry publication:

```sh
npm create miradocs@latest my-docs
cd my-docs
npm install
npm run dev
```

The npm packages have not been published yet. To run this repository's documentation site locally, use `npm ci` and `npm run dev`.

The starter creates your content folder, configuration, and theme stylesheet. miradocs is installed as a dependency. See [Installation](docs/01-getting-started/01-installation.md) for package manager tabs and local package setup before publication.

Open http://localhost:8000. Development mode watches content, configuration, theme, and component files and reloads the browser after successful builds.

```sh
npm run build
```

Deploy the contents of `site/` to any static host. The output has no server runtime requirement. The CLI can also be used directly with Node.js or installed through any compatible JavaScript package manager.

The framework includes:

- CommonMark, tables, task lists, footnotes, images, and highlighted code.
- Automatic nested navigation, explicit sidebar configuration, pagination, and a pinned outline.
- Light, dark, and system themes, semantic CSS tokens, custom styles, logos, and links.
- Lazy-loaded fuzzy search with platform-aware keyboard shortcuts.
- Locale folders, language switching, translated interface dictionaries, and RTL layout support.
- Tabs, callouts, disclosures, cards, buttons, steps, badges, file trees, searchable lists, content groups, and custom HTML components.
- Optional React, Vue, Svelte, and browser module components with per-page bundles and navigation cleanup.
- Landing pages without sidebars.
- Static metadata, sitemap generation, 404 pages, drafts, and internal link checking.
- Atomic builds that preserve previous output on failure.

Configuration lives in `miradocs.config.json`. The `docs/` directory contains the documentation for miradocs. `miradocs.schema.json` provides editor completion and validation.

Run `npm test` for integration checks, or `npm run check` for tests and a production documentation build. GitHub Actions runs checks on Windows, macOS, and Linux with Node.js 20, 22, and 24.

MIT licensed. Interface icons are from Lucide; brand icons are from Simple Icons and retain their respective trademark associations.

Maintainers: see [RELEASING.md](RELEASING.md) for tag-based npm trusted publishing and the one-time npm setup.
