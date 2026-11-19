---
title: Inhaltsformate
description: Seiten sind .md-Dateien mit YAML-Metadaten.
---
Markdown unterstützt Tabellen, Aufgabenlisten, Fußnoten, automatische Links und Komponenten. JSON konfiguriert die Website, HTML definiert Vorlagen, CSS die Stile und JavaScript optionales Verhalten. JSX, Vue und Svelte werden als Framework-Komponenten eingebunden, nicht als Seitenformate. Codeblöcke zeigen ihren Inhalt an, ohne ihn auszuführen. HTML in Markdown benötigt `markdown.html: true`. Weitere Syntax erklärt der [Markdown-Leitfaden](https://www.markdownguide.org/extended-syntax/).

## Seitenmetadaten

```md title=docs/example.md
---
title: "Install: Windows"
description: Set up the project on Windows.
draft: false
---

## Requirements

Write the page content here.
```


## HTML

```json title=miradocs.config.json
{
  "markdown": { "html": true }
}
```

```md
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search.
```


## Codebeispiele

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````
