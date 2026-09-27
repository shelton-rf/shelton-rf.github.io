# Ryne F. Shelton | Personal Website

This repository hosts the personal website for Ryne F. Shelton and is configured for GitHub Pages deployment.

## Overview

This project is a lightweight static portfolio site built with Vite and deployed via GitHub Pages. It is designed to be fast, portable, and easy to maintain while still supporting a polished engineering-focused brand presence.

## Project structure

- `index.html` — primary landing page for the site
- `assets/` — static front-end assets
  - `assets/css/` — stylesheet files
  - `assets/js/` — client-side scripts
  - `assets/images/` — all image assets used throughout the site
- `documents/` — supporting documents and downloadable assets
- `html/` — alternative or supplemental HTML content
- `_site/` — generated production build output from Vite
- `.github/workflows/deploy.yml` — GitHub Actions deployment workflow for Pages
- `sitemap.xml` — sitemap for search engine discovery
- `SECURITY.md` — security policy and reporting guidance

## Local development

```bash
npm install
npm run dev
```

Vite serves the site locally for development and hot reloading.

## Production build

```bash
npm run build
```

This creates a static build in `_site/`, which is the folder uploaded by the Pages deployment workflow.

## GitHub Pages deployment

This repository is configured to deploy automatically through GitHub Actions:

1. Push changes to the `main` branch.
2. GitHub Actions installs dependencies and runs the build.
3. The Pages workflow uploads the generated `_site/` directory.
4. GitHub Pages serves the site from that artifact.

The deployment workflow is defined in `.github/workflows/deploy.yml`.

## Sitemap

The repository includes a `sitemap.xml` at the site root. This helps search engines discover the main page and index the site more reliably.

## SEO and best practices

- Use relative asset paths to keep the site portable across static hosting environments.
- Keep the homepage and core sections clearly structured for crawlers and accessibility tools.
- Maintain a consistent site hierarchy and include meaningful alt text for images.
- Keep generated output under `_site/` so the deploy pipeline remains predictable.

## Notes

- The site is intentionally static and lightweight for GitHub Pages compatibility.
- Build artifacts are generated automatically and should not be edited directly for source changes.
- The main content is maintained in the source files and then built into the deployable output.
