---
title: Konfiguration
description: Konfiguriere die Website in miradocs.config.json.
---
Die Datei verwendet Standard-JSON; die vereinfachte Schreibweise gilt nur für Komponentenoptionen in Markdown. Lege Titel, Quell- und Ausgabeordner, Stile, Links und Sprachen fest. Das enthaltene Schema unterstützt Autovervollständigung und Prüfung in geeigneten Editoren. Pfade in `styles` sind relativ zu `theme/`. `dev`, `build` und `preview` dienen Entwicklung, Erstellung und Vorschau. `--config` wählt eine andere Datei, `--port` einen anderen Port. Mit `miradocs:navigate` initialisierst du Scripts nach Seitenwechseln.

## Optionen

| Option | Standard | Verwendung |
| --- | --- | --- |
| `title` | `"Documentation"` | Name der Website |
| `site` | — | Öffentliche Basisadresse für kanonische URLs und Sitemap |
| `base` | `"/"` | URL-Pfadpräfix |
| `logo` | — | Bild im Header |
| `favicon` | — | Symbol des Browser-Tabs |
| `links` | `[]` | Links im Header |
| `footer` | — | Text im Seitenfuß |
| `editUrl` | — | Repository-Ordner für Bearbeitungslinks |
| `content` | `"docs"` | Ordner mit Markdown-Seiten |
| `output` | `"site"` | Ausgabeordner, getrennt von Quelldateien |
| `theme` | `"theme"` | Ordner für eigene Stile |
| `components` | `"components"` | Ordner für HTML-Vorlagen |
| `public` | `"public"` | Unverändert kopierte Dateien |
| `styles` | `[]` | Geordnete Stylesheets relativ zum Theme-Ordner |
| `sidebar` | — | Gruppen und Links; standardmäßig aus Ordnern erzeugt |
| `search` | `{}` | Suchoptionen; false deaktiviert die Suche |
| `language` | `"en"` | Sprachcode einer einsprachigen Website |
| `locales` | — | Sprachen, Ordner, Beschriftungen und Textrichtung |
| `clientNavigation` | `true` | Seitenwechsel ohne vollständiges Neuladen |
| `strictLinks` | `true` | Fehlende interne Seiten, Dateien und Sprungmarken erkennen |
| `markdown.html` | `false` | Rohes HTML in Markdown erlauben |
| `scripts` | `[]` | URLs von Browsermodulen |
| `clientComponents` | `{}` | Registrierte React-, Vue-, Svelte-Komponenten und Module |


## Grundkonfiguration

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


## Header-Links und Icons

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


## Befehle

:::tabs Paketmanager
:::tab npm
| Command | What it does |
| --- | --- |
| `npm run dev` | Build, watch your files, and refresh the preview |
| `npm run build` | Generate the production site |
| `npm run preview` | Build and preview without watching |
:::
:::tab pnpm
| Command | What it does |
| --- | --- |
| `pnpm run dev` | Build, watch your files, and refresh the preview |
| `pnpm run build` | Generate the production site |
| `pnpm run preview` | Build and preview without watching |
:::
:::tab Yarn
| Command | What it does |
| --- | --- |
| `yarn run dev` | Build, watch your files, and refresh the preview |
| `yarn run build` | Generate the production site |
| `yarn run preview` | Build and preview without watching |
:::
:::tab Bun
| Command | What it does |
| --- | --- |
| `bun run dev` | Build, watch your files, and refresh the preview |
| `bun run build` | Generate the production site |
| `bun run preview` | Build and preview without watching |
:::
:::

:::tabs Paketmanager
:::tab npm
```sh
npx miradocs build --config miradocs.config.json
npx miradocs dev --port 8001
npx miradocs serve --port 8001
```
:::
:::tab pnpm
```sh
pnpm exec miradocs build --config miradocs.config.json
pnpm exec miradocs dev --port 8001
pnpm exec miradocs serve --port 8001
```
:::
:::tab Yarn
```sh
yarn exec miradocs build --config miradocs.config.json
yarn exec miradocs dev --port 8001
yarn exec miradocs serve --port 8001
```
:::
:::tab Bun
```sh
bunx --no-install miradocs build --config miradocs.config.json
bunx --no-install miradocs dev --port 8001
bunx --no-install miradocs serve --port 8001
```
:::
:::
