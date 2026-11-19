---
title: Badges
description: Verwende badge für kurze Kennzeichnungen wie Status oder Versionen.
---
Der Text steht direkt nach dem Namen der Direktive. Längere Erklärungen gehören in den Seiteninhalt. `.badge` oder eine Instanzklasse steuern Farben, Rahmen und Schrift.

## Beispiel

:::badge Beta
:::


## Badge hinzufügen

```md
:::badge Beta {.release-badge}
:::
```


## Anpassen

```css title=theme/components.css
.release-badge {
  border-radius: 999px;
  background: var(--selected);
  color: var(--text);
  padding: 3px 10px;
}
```
