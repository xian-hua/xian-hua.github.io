# Academic Pages to al-folio migration

## Status and safety

- Public URL remains `https://xian-hua.github.io/`.
- Source baseline: `origin/master` at commit `8649e4f46cb0615fa0eb05ba1e1f6fce72a6fd1e`.
- Safety branch: `backup/pre-al-folio-20260827` (local and GitHub).
- Migration branch: `migration/al-folio-v1.2`.
- Published to `master` on 2026-08-28; deployment workflow fix commit: `69c4860`.
- GitHub Pages publishes the generated site from `gh-pages` at the repository root with HTTPS enforced.
- Target starter: official stable al-folio v1.2 with its pinned plugin versions.

## Migrated content

- Rebuilt the homepage around About, Research Interests, News, Selected Publications, and Contact.
- Preserved the existing biography, research interests, eight original News items, profile photo, email address, Google Scholar profile, and GitHub profile.
- Added a ninth News item for the National Natural Science Foundation of China Young Scientists Fund (C) grant.
- Consolidated 20 IEEE Author Profile publication records into `_bibliography/papers.bib`.
- Added verified DOI links for all 20 papers and existing arXiv identifiers where available.
- Marked five representative papers as selected for the homepage.
- Corrected the IEEE Communications Magazine record to publication year 2026.
- Corrected the IEEE Network DOI to `10.1109/MNET.004.2300013` after DOI-resolver verification.
- Added a factual JSON Resume CV with only dates and appointments supported by the previous site.
- Updated the CV with confirmed degree fields and dates, the formal Tatung University–Iowa State University joint dual-degree arrangement, the February–December 2024 postdoctoral appointment, the tenure-track title, and the office location.
- Recorded both confirmed grants as principal investigator, with the public pages showing the month-precise periods January 2025–December 2027 and January 2027–December 2029.
- ORCID and telephone details are intentionally omitted at the user's request.
- Kept the Teaching page hidden until confirmed course information is available; the People page is intentionally omitted for now.
- Added a CV-only post-render style hook that suppresses unintended native list markers without enabling the site-wide compatibility layer or affecting navigation.
- News dates display month and year only because the previous site did not provide exact days.

## Removed placeholder content

The migration removes the Academic Pages runtime and all demo material, including:

- `Your Name` site metadata and footer text
- `GitHub University`, sample skills, and sample Slack-team text
- example talks, teaching entries, portfolios, posts, comments, maps, PDFs, and slides
- demo profile images and template social accounts
- duplicate per-publication Markdown records

## Deployment

The `Deploy site` workflow builds on pushes to `master` or `main`, purges unused CSS, and deploys `_site` to `gh-pages`. Pull requests build but do not deploy. A separate workflow checks generated internal links after a successful deployment, and the accessibility workflow can be started manually.

Applied repository settings:

1. GitHub Actions is enabled with permission to write repository contents.
2. GitHub Pages publishes from the `gh-pages` branch at the repository root.
3. The migration and workflow fix are present on both `master` and `migration/al-folio-v1.2`.

The root-user-site configuration is:

```yaml
url: https://xian-hua.github.io
baseurl:
```

## Validation completed

- Prettier: passed.
- al-folio starter style contract: passed.
- al-folio upgrade audit: 0 blocking and 0 non-blocking findings.
- Production Jekyll build: passed.
- Responsive images: source PNG plus 480, 800, and 1400 pixel WebP variants generated.
- PurgeCSS: processed eight generated CSS files successfully.
- Generated HTML crawl: 7 HTML pages, 0 broken internal links.
- DOI resolver: all publication DOI links returned valid redirects at the time of the corresponding update.
- Desktop browser at 1366 px: no horizontal overflow, profile image loaded, no console errors.
- Mobile browser at 390 px: no horizontal overflow, profile image loaded, navigation expanded correctly, no console errors.
- Homepage: 5 selected publications and 9 News rows rendered.
- SEO outputs: canonical URL, description, keywords, Open Graph image, Twitter card, Schema.org JSON-LD, sitemap, robots.txt, and emoji favicon generated.
- Production deploy workflow, Pages deployment, and post-deployment broken-link workflow: passed.
- Live homepage, Publications, News, CV, sitemap, and robots routes: HTTP 200 on 2026-08-28.

External-link checking found no confirmed dead third-party content links. The local network timed out on arXiv, Google Scholar, and one Google Sites page; these links were retained because they are existing or independently verified academic-profile links. Before deployment, the old public site returned 404 for the new `/news/` route; the route is now live and passed the generated-site internal crawl. The `/people/` route was subsequently removed at the user's request.

## Information requiring confirmation

1. Full titles, author lists, links, and final bibliographic details for the 2026 TMC, TCOM, ICDCS, VTC-Spring workshop, ICC workshop, and GLOBECOM News items.
2. Teaching: course titles, semesters, level, role, and any public materials.
3. A current PDF CV, if a download button is wanted.
4. Author-hosted PDFs, code repositories, project pages, videos, or slides for publications.
5. A dedicated 1200 × 630 social-preview graphic and 180 × 180 Apple touch icon, if preferred over the current profile image and emoji favicon.
6. Optional Google Analytics, Google Search Console, and Bing Webmaster verification identifiers.

## Rollback

If deployment needs to be reversed, restore `master` from `backup/pre-al-folio-20260827` and rerun the deployment workflow. The backup points to the exact pre-migration source commit.
