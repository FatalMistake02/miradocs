---
title: Inhalte schreiben
description: Erstelle Seiten in Markdown mit YAML-Metadaten.
---
Lege am Dateianfang `title` und bei Bedarf `description` fest. Beginne den Inhalt mit `##`, da der Seitentitel bereits angezeigt wird. `###` kennzeichnet Unterabschnitte. Links, Bilder, Tabellen, Aufgabenlisten, Fußnoten und Komponenten werden unterstützt. Links auf `.md`-Dateien werden in Seiten-URLs umgewandelt. Bilder und Downloads liegen in `public/`. Der Build prüft interne Seiten, Dateien und Sprungmarken. Die Grundlagen erklärt das [CommonMark-Tutorial](https://commonmark.org/help/tutorial/).

## Seite erstellen

````md title=docs/01-guides/01-installation.md
---
title: Installation
description: Install the project and start a local preview.
---

## Requirements

- Node.js 20.19 or newer
- A copy of the project

## Install

Run these commands from the project directory:

:::tabs Package manager
:::tab npm
```sh
npm install
npm run dev
```
:::
:::tab pnpm
```sh
pnpm install
pnpm run dev
```
:::
:::tab Yarn
```sh
yarn install
yarn run dev
```
:::
:::tab Bun
```sh
bun install
bun run dev
```
:::
:::

:::note Production build
Run the `build` script to generate the finished site.
:::
````


## Links und Bilder hinzufügen

```md
[Installation](../01-guides/01-installation.md)
[Configuration](/reference/configuration/)
[Markdown tutorial](https://commonmark.org/help/tutorial/)
```

```md
![The setup screen](/images/setup.png)
[Download the sample](/downloads/sample.zip)
```


## Komponenten hinzufügen

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

:::note Before you start
Keep your configuration file in the project root.
:::
