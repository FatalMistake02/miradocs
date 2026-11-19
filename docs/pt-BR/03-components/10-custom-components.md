---
title: Componentes personalizados
description: Crie um modelo HTML reutilizável em components/.
---
O nome do arquivo vira o nome da diretiva. `{{title}}` recebe o título e `{{content}}` o corpo Markdown renderizado; inclua exatamente um marcador `{{content}}`. As classes de instância são adicionadas ao elemento externo. Guarde os estilos em `theme/`. Para comportamento próprio, adicione um módulo a `scripts` e inicialize-o também após `miradocs:navigate`. Componentes com montagem e limpeza próprias podem usar o registro de componentes de framework.

## Exemplo

:::example Release notes
Add a short summary, a list of changes, or a link to the full release.
:::


## Criar um modelo

```html title=components/example.html
<section class="feature-card">
  <strong>{{title}}</strong>
  {{content}}
</section>
```

```md
:::example Release notes {.release-summary}
Add a short summary, a list of changes, or a link to the full release.
:::
```


## Adicionar estilos

```css title=theme/components.css
.feature-card {
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--panel-radius);
  padding: 24px;
}
.release-summary { border-inline-start: 3px solid var(--accent); }
```


## Adicionar JavaScript

```json title=miradocs.config.json
{
  "scripts": ["/example.js"]
}
```

```js title=public/example.js
function initializeExample() {
  document.querySelectorAll(".feature-card").forEach(card => {
    if (card.dataset.initialized) return;
    card.dataset.initialized = "true";
    // Set up the behavior for this card.
  });
}

initializeExample();
document.addEventListener("miradocs:navigate", initializeExample);
```
