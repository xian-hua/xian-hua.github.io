# Xianhua Yu — Academic Website

Academic website of Xianhua Yu, built with the stable [al-folio](https://github.com/alshedivat/al-folio) v1.2 structure and hosted at [xian-hua.github.io](https://xian-hua.github.io/).

## Content

- Personal profile and research focus: `_pages/about.md`
- Publications: `_bibliography/papers.bib`
- News: `_news/`
- CV data: `assets/json/resume.json`
- Social-preview and icon sources: `assets/img/branding/`
- Social and academic profiles: `_data/socials.yml`
- Site metadata and features: `_config.yml`
- Search Console handoff: `SEARCH_INDEXING.md`

No generated site files are edited by hand. Publications should be maintained in the single BibTeX file.

## Local checks

The GitHub Actions workflows use Ruby 3.3.5, Node 24, and ImageMagick. JavaScript tools are locked in `package-lock.json`; workflows use `npm ci` and do not install floating global packages.

```sh
npm ci
bundle install
npm run lint:prettier
npm run lint:style-contract
bundle exec al-folio upgrade audit --no-fail
JEKYLL_ENV=production bundle exec jekyll build
npm run purge:css
npx playwright install chromium
npm run test:accessibility
```

The accessibility suite covers the homepage, Publications, CV, and News routes. A separate scheduled workflow records external-link results without allowing transient third-party failures to block deployment.

## Deployment

A pull request builds and validates the site without publishing it. A validated push to `master` deploys the generated `_site` directory to the `gh-pages` branch. In repository settings, GitHub Pages must use the `gh-pages` branch at its root. The site is configured as a root user site:

```yaml
url: https://xian-hua.github.io
baseurl:
```

See `MIGRATION.md` for the migration and refinement record. No current PDF CV is stored in this repository, so the web CV intentionally has no download button.
