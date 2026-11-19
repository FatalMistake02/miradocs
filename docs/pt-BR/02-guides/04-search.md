---
title: Busca
description: A busca é integrada e carrega o índice ao abrir pela primeira vez.
---
Use Ctrl K no Windows e Linux, ou ⌘ K no macOS. As setas percorrem os resultados, Enter abre uma página e Esc fecha a janela. Configure `search.limit` e `search.threshold`; `search: false` desativa a busca do site. Nos metadados de uma página, `search: false` exclui apenas essa página do índice. Cada idioma tem seu próprio índice. Rótulos e estilos podem ser personalizados.

## Configurar resultados

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
