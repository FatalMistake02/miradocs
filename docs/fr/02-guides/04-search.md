---
title: Recherche
description: La recherche est intégrée et charge son index à la première ouverture.
---
Utilisez Ctrl K sous Windows et Linux, ou ⌘ K sous macOS. Les flèches parcourent les résultats, Entrée ouvre une page et Échap ferme la fenêtre. Réglez `search.limit` et `search.threshold` ; `search: false` désactive la recherche du site. Dans les métadonnées d’une page, `search: false` l’exclut de l’index. Chaque langue possède son propre index. Les libellés et les styles sont personnalisables.

## Configurer les résultats

```json title=miradocs.config.json
{
  "search": {
    "limit": 10,
    "threshold": 0.35
  }
}
```

```yaml
---
title: Internal notes
search: false
---
```
