---
title: Schritte
description: Stelle Anweisungen als nummerierte Abfolge dar.
---
Überschriften der Ebene drei (`###`) innerhalb von `steps` beginnen jeweils einen Schritt und erscheinen auch in der Seitenübersicht. Schritte können Markdown und Komponenten enthalten. Jeder neue Block beginnt wieder bei eins. `.steps` und `.steps h3::before` steuern Abstände und Nummern.

## Beispiel

:::steps
### Install dependencies
Install dependencies using your [package manager](/de/getting-started/installation/).
### Start the preview
Run the `dev` script and open the address in your terminal.
### Build the site
Run the `build` script to generate `site/`.
:::


## Schritte hinzufügen

```md
:::steps {.setup-steps}
### Install dependencies
Install dependencies using your [package manager](/getting-started/installation/#create-your-site).
### Start the preview
Run the `dev` script.
### Build the site
Run the `build` script to generate `site/`.
:::
```


## Anpassen

```css title=theme/components.css
.setup-steps { padding-inline-start: 44px; }
.setup-steps h3::before {
  background: var(--surface);
  border-color: var(--border);
  color: var(--text);
}
```
