---
title: Tabs
description: Gruppiere zusammengehörige Beispiele in mehreren Bereichen.
---
Jeder `tab` steht direkt in `tabs` und erhält eine Beschriftung sowie einen eigenen Abschluss. Anfangs ist der erste Bereich ausgewählt. Bereiche können Markdown und verschachtelte Komponenten enthalten. Die Pfeiltasten wechseln Tabs, Pos1 und Ende wählen den ersten beziehungsweise letzten Tab. `.tabs`, `.tab-list` und `.tab-panel` steuern die Gestaltung.

## Beispiel

:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::


## Tabs hinzufügen

````md
:::tabs Build commands {.build-tabs}
:::tab npm
```sh
npm run build
```
:::
:::tab pnpm
```sh
pnpm build
```
:::
:::tab Yarn
```sh
yarn run build
```
:::
:::tab Bun
```sh
bun run build
```
:::
:::
````


## Anpassen

```css title=theme/components.css
.build-tabs { border-radius: 16px; }
.build-tabs .tab-list { gap: 28px; }
.build-tabs .tab-panel { padding: 12px 24px; }
.build-tabs [role="tab"][aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```
