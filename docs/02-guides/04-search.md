---
title: Search
description: Help readers find what they need with a fast, built-in search experience.
---
## Find anything

Press `Ctrl K` or `⌘ K`, or select the search field in the header. Search runs in the browser using a generated index, with no external service or account. Use the arrow keys to navigate results, Enter to open one, and Escape to close the dialog.

## How it works

miradocs writes `search.json` at build time. Page titles, descriptions, and content are indexed; title matches rank higher. Search returns up to eight results.

## Customize the experience

The search interface uses the same theme variables as the rest of the site. Override its CSS classes in your custom stylesheet. The search behavior lives in `assets/app.js` if you need to go further.

:::note Preview over HTTP
Browsers may block loading the index from a local `file://` URL. Use `npm run dev` or any static web server.
:::

