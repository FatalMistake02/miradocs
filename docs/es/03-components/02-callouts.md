---
title: Avisos
description: 'Destaca información con note, tip, caution o danger.'
---
El título es opcional y el cuerpo admite Markdown. Elige el tipo según el contenido, no solo por el color. Personaliza `.callout`, `.callout-title` y `--callout-color`, o añade una clase a una instancia concreta.

## Ejemplos

:::note
Your theme styles load after the default CSS.
:::

:::tip
Add a class to style one component without changing the others.
:::

:::caution
Changes made directly in `site/` are replaced by the next build.
:::

:::danger
Deleting your source folder removes the pages used to build the site.
:::


## Añadir un aviso

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```


## Personalizar

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```
