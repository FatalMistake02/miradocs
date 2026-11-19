---
title: Buttons
description: Mit button erhält ein Navigationslink das Aussehen eines Buttons.
---
Trenne Beschriftung und URL mit ` | ` und schließe die Komponente mit `:::`. Das Element bleibt ein Link und dient zur Navigation. Eine Instanzklasse und `.action-button` ermöglichen eigene Stile.

## Beispiel

:::button Get started | /de/getting-started/installation/
:::


## Button hinzufügen

```md
:::button Get started | /getting-started/installation/ {.start-button}
:::
```


## Anpassen

```css title=theme/components.css
.start-button {
  background: var(--accent-gradient);
  --accent-text: white;
  border: 0;
  border-radius: 999px;
  padding: 12px 22px;
}
```
