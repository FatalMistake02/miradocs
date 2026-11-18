# Mira Docs

A small static documentation framework with folder-based navigation, a customizable CSS token theme, built-in search, and reusable components. Mira builds its own documentation with no third-party dependencies.

Requires Python 3.9 or newer.

```sh
python -m miradocs serve
```

Visit http://localhost:8000. Restart the preview after editing. Run `python -m miradocs build` to generate the static site in `site/` for deployment to any static host. Start with `mira.json`, `docs/`, and `theme/`; the documentation covers configuration, components, theming, search, and deployment.

Mira is an early framework: it supports a deliberately small Markdown dialect and currently has English interface text. See the documentation for supported syntax and hosting details.
