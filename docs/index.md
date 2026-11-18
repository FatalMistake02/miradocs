---
title: Introduction
description: A calmer way to build documentation. Simple to start, flexible enough to make entirely yours.
---
:::card DOCUMENTATION, WITHOUT THE NOISE
Mira gives your ideas a thoughtful home. Bring your content, choose your colors, and publish a fast, beautiful site anywhere.
:::

## A little less setup, a lot more clarity

Great documentation should feel effortless to read and straightforward to maintain. Mira turns a folder of Markdown files into a complete static site, with the details already taken care of.

- **Start small.** A config file, a content folder, and Python are all you need.
- **Make it yours.** Change a few variables or go deeper with your own CSS and components.
- **Ship anywhere.** The output is just HTML, CSS, and JavaScript. No server runtime required.

## Get going in a minute

From the project folder, build the site and start a local preview:

```sh
python -m miradocs serve
```

Then visit [localhost:8000](http://localhost:8000). Edit a page in `docs/` and restart the command to rebuild. When you're ready to publish, run `python -m miradocs build` and upload the `site/` folder.

:::tip A good place to start
Head to [Quick start](/getting-started/quick-start/) for the full walkthrough, or explore [Theming](/guides/theming/) to make Mira feel like your own.
:::

## Built for the long run

Mira keeps the moving parts visible. Your content stays in plain files, your theme lives in its own folder, and your built site has no dependency on a particular hosting provider.
