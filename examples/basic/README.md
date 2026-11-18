# Example documentation site

Run from the miradocs repository root:

```sh
node bin/miradocs.js dev --config examples/basic/miradocs.config.json --port 8001
```

Open http://localhost:8001. The `docs/` folder contains a landing page, a guide, and a reference page. These are the complete files shown in the main documentation's Page examples guide.

To build:

```sh
node bin/miradocs.js build --config examples/basic/miradocs.config.json
```

Copy the source files into another project's content directory and replace the sample text and commands. The generated `site/` folder is ignored by Git.
