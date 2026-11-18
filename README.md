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

Generated projects contain only their own content, config, and theme overrides. The framework is installed as a dependency. The creator can also be packed and run locally before publication.

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
- Tabs, callouts, disclosures, cards, action links, steps, badges, icon-based file trees, and custom HTML components.
- Optional React, Vue, Svelte, and browser module components with per-page bundles and navigation cleanup.
- Landing pages without sidebars.
- Static metadata, sitemap generation, 404 pages, drafts, and internal link checking.
- Atomic builds that preserve previous output on failure.

Configuration lives in `miradocs.config.json`. The `docs/` directory is the framework's own documentation, including setup, components, navigation, theming, localization, and deployment. `miradocs.schema.json` provides editor schema support. The npm registry package has not been published; install from this repository or a locally generated tarball.

Run `npm test` for integration checks, or `npm run check` for tests and a production documentation build. GitHub Actions runs checks on Windows, macOS, and Linux with Node.js 20, 22, and 24.

MIT licensed. Interface icons are from Lucide; brand icons are from Simple Icons and retain their respective trademark associations.
