---
title: Hinweiskästen
description: 'Hebe Informationen mit note, tip, caution oder danger hervor.'
---
Der Titel ist optional, der Inhalt unterstützt Markdown. Wähle den Typ nach seiner Bedeutung. `.callout`, `.callout-title` und `--callout-color` bestimmen das Aussehen. Eine zusätzliche Klasse begrenzt Änderungen auf einen einzelnen Kasten.

## Beispiele

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


## Hinweiskasten hinzufügen

```md
:::note Before you start {.setup-note}
Keep your configuration file in the project root.
:::
```


## Anpassen

```css title=theme/components.css
.setup-note {
  --callout-color: var(--accent);
  border-radius: 12px;
  padding: 20px;
}
.setup-note .callout-title { font-size: 14px; }
```
