---
title: Formatos de contenido
description: Las páginas se escriben en archivos .md con metadatos YAML.
---
Markdown admite tablas, tareas, notas al pie, enlaces automáticos y componentes. Utiliza la configuración JSON para el sitio, HTML para plantillas, CSS para estilos y JavaScript para comportamiento opcional. Para JSX, Vue o Svelte, registra un componente de framework; no son formatos de página. Los bloques de código muestran su contenido sin ejecutarlo. El HTML en Markdown requiere `markdown.html: true`. La sintaxis se puede consultar en la [guía de Markdown](https://www.markdownguide.org/extended-syntax/).

## Metadatos de página

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


## Ejemplos de código

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````
