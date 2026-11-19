---
title: Startseiten
description: Erstelle eine Übersichtsseite ohne Seitenleisten.
---
Füge den Metadaten `layout: landing` und `sidebar: false` hinzu. Schreibe anschließend deine Einleitung, Links und Komponenten in Markdown. Ein Button führt zum Einstieg, Karten verweisen auf wichtige Bereiche. Einzelne Instanzen lassen sich über Klassen in `theme/` gestalten. Andere Dokumentationsseiten behalten ihr normales Layout.

## Layout festlegen

```md title=docs/index.md
---
title: My project
description: What the project does and who it is for.
layout: landing
sidebar: false
---

:::button Get started | /guides/installation/
:::

:::cards
:::card Installation | /guides/installation/
Set up the project and run it locally.
:::
:::card Configuration | /reference/configuration/
Choose the settings for your project.
:::
:::
```


## Darstellung ändern

```css title=theme/custom.css
.landing-layout .main {
  max-width: 1100px;
}
.landing-layout h1 {
  font-size: clamp(40px, 7vw, 72px);
}
```
