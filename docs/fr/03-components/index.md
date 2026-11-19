---
title: Utiliser les composants
description: Ajoutez des composants directement dans Markdown.
---
Écrivez `:::nom`, le contenu et la fermeture `:::` sur des lignes séparées. Les composants configurables acceptent des objets comme `{ title: Guides, search: true }` : les clés et le texte simple n’exigent pas de guillemets. Séparez les options par des virgules et ajoutez un espace après chaque deux-points. Mettez entre guillemets les textes contenant des virgules ou signes particuliers. JSON reste accepté. Ajoutez `{.ma-classe}` pour personnaliser une seule instance.

:::cards
:::card Onglets | /fr/components/tabs/
:::
:::card Encadrés | /fr/components/callouts/
:::
:::card Contenu dépliable | /fr/components/disclosures/
:::
:::card Cartes | /fr/components/cards/
:::
:::card Boutons | /fr/components/buttons/
:::
:::card Étapes | /fr/components/steps/
:::
:::card Arborescences de fichiers | /fr/components/file-trees/
:::
:::card Badges | /fr/components/badges/
:::
:::card Blocs de code | /fr/components/code-blocks/
:::
:::card Composants personnalisés | /fr/components/custom-components/
:::
:::card Composants de frameworks | /fr/components/framework-components/
:::
:::card Groupes de contenu | /fr/components/content-groups/
:::
:::card Listes | /fr/components/lists/
:::
:::

## Exemples

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
