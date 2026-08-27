# Xianhua Yu — Academic Website

This repository contains the source for [xian-hua.github.io](https://xian-hua.github.io/), built with the stable [al-folio](https://github.com/alshedivat/al-folio) v1.2 starter and its pinned theme plugins.

## Content

- Personal profile and research focus: `_pages/about.md`
- Publications: `_bibliography/papers.bib`
- News: `_news/`
- CV data: `assets/json/resume.json`
- Social and academic profiles: `_data/socials.yml`
- Site metadata and features: `_config.yml`

No generated site files are edited by hand. Publications should be maintained in the single BibTeX file.

## Local checks

The GitHub Actions workflow uses Ruby 3.3.5, Node 20, Python 3.13, and ImageMagick.

```sh
npm ci
bundle install
npm run lint:prettier
npm run lint:style-contract
bundle exec al-folio upgrade audit --no-fail
JEKYLL_ENV=production bundle exec jekyll build
npx purgecss -c purgecss.config.js
```

## Deployment

A push to `master` builds the site and deploys the generated `_site` directory to the `gh-pages` branch. In repository settings, GitHub Pages must use the `gh-pages` branch as its publishing source. The site is configured as a root user site:

```yaml
url: https://xian-hua.github.io
baseurl:
```

See `MIGRATION.md` for the migration record, safety branches, and information still awaiting confirmation.
