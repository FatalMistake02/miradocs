---
title: Introduction
description: Build a static documentation site from Markdown files.
---
miradocs generates a documentation site from a directory of Markdown files. It includes navigation, search, a responsive layout, dark mode, syntax highlighting, and customizable styles.

## Get started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open [localhost:8000](http://localhost:8000). Restart the server after changing files. To create static files for deployment, run `npm run build`.

## How it works

Pages live in `docs/`. Their filenames and folders determine URLs and navigation order. Configure the site in `miradocs.config.json`, override design tokens in `theme/`, and add reusable HTML templates in `components/`.

Continue with [Quick start](/getting-started/quick-start/) or read about [theming](/guides/theming/).
