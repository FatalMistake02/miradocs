---
title: Configuration
description: Site settings, defaults, and command-line options.
---
Site settings live in `miradocs.config.json`. File paths resolve relative to that configuration file.

## Basic configuration

```json title=miradocs.config.json
{
  "$schema": "./node_modules/miradocs/miradocs.schema.json",
  "title": "Project docs",
  "content": "docs",
  "output": "site",
  "theme": "theme",
  "styles": ["tokens.css", "components.css"]
}
```

The schema adds completion and validation in editors that support JSON Schema. Each stylesheet listed in `styles` must exist in the theme folder.

## Site settings

### Name, links, and metadata

| Setting | Default | Purpose |
| --- | --- | --- |
| `title` | `"Documentation"` | Site name shown in the header and browser titles |
| `site` | Unset | Public origin used for canonical URLs, the sitemap, and `robots.txt` |
| `base` | `"/"` | URL path where the site is hosted, such as `/handbook/` |
| `logo` | Book icon | Image URL for the header logo |
| `favicon` | Unset | Image URL for the browser tab icon |
| `links` | `[]` | Header links with `label`, `url`, and optional `icon` and `newTab` |
| `footer` | Unset | Text shown below page content |
| `editUrl` | Unset | Repository folder URL used to build an edit link for each page |

Put local images in `public/` and use URLs such as `/logo.svg`.

### Project folders

| Setting | Default | Purpose |
| --- | --- | --- |
| `content` | `"docs"` | Markdown pages |
| `output` | `"site"` | Generated site |
| `theme` | `"theme"` | Custom stylesheets |
| `components` | `"components"` | HTML component templates |
| `public` | `"public"` | Images, fonts, downloads, and scripts |
| `styles` | `[]` | Stylesheets to load from the theme folder, in order |

Keep `output` separate from your source folders and inside the project directory.

### Navigation, search, and languages

| Setting | Default | Purpose |
| --- | --- | --- |
| `sidebar` | Built from folders | Custom page links and groups; see [Navigation](/guides/navigation/) |
| `search` | Enabled | An options object or `false`; see [Search](/guides/search/) |
| `language` | `"en"` | Language code for a single-language site |
| `locales` | One locale from `language` | Language folders, labels, interface text, and direction; see [Localization](/guides/localization/) |
| `clientNavigation` | `true` | Switch between pages without reloading the document |

Search options are `limit` (default `10`, range `1–50`) and `threshold` (default `0.35`, range `0–1`).

### Content and extensions

| Setting | Default | Purpose |
| --- | --- | --- |
| `strictLinks` | Enabled | Fail the build for missing internal pages, assets, and heading fragments |
| `markdown.html` | `false` | Allow raw HTML in Markdown pages |
| `scripts` | `[]` | Public module-script URLs to load on the site |
| `clientComponents` | `{}` | Registered React, Vue, Svelte, and browser module components |

See [Content formats](/reference/content-formats/), [Custom components](/components/custom-components/), and [Framework components](/components/framework-components/) for examples.

## Header links and icons

```json title=miradocs.config.json
{
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-name/your-project",
      "icon": "github",
      "newTab": true
    },
    {
      "label": "Community",
      "url": "https://example.com/community",
      "icon": "custom:/icons/community.svg"
    }
  ]
}
```

Use a Simple Icons slug such as `github`, a Lucide name such as `book-open`, or `custom:/path.svg` for your own image. Interface controls use Lucide icons.

## Commands

The generated project includes scripts for the usual tasks:

| Command | What it does |
| --- | --- |
| `npm run dev` | Build, watch your files, and refresh the preview |
| `npm run build` | Generate the production site |
| `npm run preview` | Build and preview without watching |

### Run the CLI directly

For a project with miradocs installed, use `npx miradocs`:

```sh
npx miradocs build --config miradocs.config.json
npx miradocs dev --port 8001
npx miradocs serve --port 8001
```

`--config` selects a configuration file. `--port` changes the preview port from `8000`. Use `--help` for commands and `--version` for the installed version.

`npx miradocs init my-docs` creates a project from an existing installation. For a new project, start with [Installation](/getting-started/installation/).

### Client navigation hooks

Custom scripts can listen for `miradocs:navigate` after a page has loaded. The destination URL is in `event.detail.url`. Add `data-no-router` to an anchor to use a normal page load for that link. See [Custom components](/components/custom-components/#add-javascript) for an initialization example.
