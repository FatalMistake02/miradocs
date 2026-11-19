---
title: Komponenten verwenden
description: Verwende Komponenten direkt in Markdown.
---
Schreibe `:::name`, den Inhalt und das abschließende `:::` jeweils auf eigene Zeilen. Einstellungen verwenden Objekte wie `{ title: Anleitungen, search: true }`. Schlüssel und einfache Texte benötigen keine Anführungszeichen. Trenne Optionen mit Kommas und setze nach dem Doppelpunkt ein Leerzeichen. Texte mit Kommas oder Sonderzeichen stehen in Anführungszeichen. JSON funktioniert weiterhin. `{.meine-klasse}` gestaltet eine einzelne Instanz.

:::cards
:::card Tabellen | /de/components/tables/
:::
:::card Tabs | /de/components/tabs/
:::
:::card Hinweiskästen | /de/components/callouts/
:::
:::card Aufklappbare Inhalte | /de/components/disclosures/
:::
:::card Karten | /de/components/cards/
:::
:::card Buttons | /de/components/buttons/
:::
:::card Schritte | /de/components/steps/
:::
:::card Dateibäume | /de/components/file-trees/
:::
:::card Badges | /de/components/badges/
:::
:::card Codeblöcke | /de/components/code-blocks/
:::
:::card Eigene Komponenten | /de/components/custom-components/
:::
:::card Framework-Komponenten | /de/components/framework-components/
:::
:::card Inhaltsgruppen | /de/components/content-groups/
:::
:::card Listen | /de/components/lists/
:::
:::

## Beispiele

```md
:::note Before you start
Keep your configuration file in the project root.
:::
```

```md
:::list { title: Guides, search: true, columns: 2 }
- Installation
- Theming
:::
```

```md
:::list { title: "Setup: Windows, macOS, and Linux", search: true }
- Installation
- Configuration
:::
```
