---
title: Formatos de conteúdo
description: As páginas são arquivos .md com metadados YAML.
---
Markdown aceita tabelas, tarefas, notas de rodapé, links automáticos e componentes. Use JSON para configurar o site, HTML para modelos, CSS para estilos e JavaScript para comportamento opcional. Para JSX, Vue ou Svelte, registre um componente de framework: eles não são formatos de página. Blocos de código exibem o conteúdo sem executá-lo. HTML no Markdown exige `markdown.html: true`. Consulte o [guia de Markdown](https://www.markdownguide.org/extended-syntax/) para aprender a sintaxe.

## Metadados de páginas

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


## Exemplos de código

````md
```json title=miradocs.config.json
{ "title": "Project docs" }
```
````
