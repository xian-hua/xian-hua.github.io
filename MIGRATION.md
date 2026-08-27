# Academic Pages to al-folio migration

## Status and safety

- Public URL remains `https://xian-hua.github.io/`.
- Source baseline: `origin/master` at commit `8649e4f46cb0615fa0eb05ba1e1f6fce72a6fd1e`.
- Local safety branch: `backup/pre-al-folio-20260827`.
- Migration branch: `migration/al-folio-v1.2`.
- The public `master` branch is not changed by this migration branch.
- Target starter: official stable al-folio v1.2 with its pinned plugin versions.

## Migrated content

- Rebuilt the homepage around About, Research Interests, News, Selected Publications, Students & People, and Contact.
- Preserved the existing biography, research interests, eight News items, profile photo, email address, Google Scholar profile, and GitHub profile.
- Consolidated 14 publication records into `_bibliography/papers.bib`.
- Added verified DOI links for all 14 papers and existing arXiv identifiers for four papers.
- Marked five representative papers as selected for the homepage.
- Corrected the IEEE Communications Magazine record to publication year 2026.
- Corrected the IEEE Network DOI to `10.1109/MNET.004.2300013` after DOI-resolver verification.
- Added a factual JSON Resume CV with only dates and appointments supported by the previous site.
- Added restrained People and Teaching pages without demo names, courses, calendars, or skills.
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

Required repository settings:

1. GitHub Actions must be enabled with permission to write repository contents.
2. GitHub Pages must publish from the `gh-pages` branch at the repository root.
3. Merge the migration branch only after reviewing the preview and the confirmation list below.

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
- DOI resolver: all 14 DOI links returned valid redirects.
- Desktop browser at 1366 px: no horizontal overflow, profile image loaded, no console errors.
- Mobile browser at 390 px: no horizontal overflow, profile image loaded, navigation expanded correctly, no console errors.
- Homepage: 5 selected publications and 8 News rows rendered.
- SEO outputs: canonical URL, description, keywords, Open Graph image, Twitter card, Schema.org JSON-LD, sitemap, robots.txt, and emoji favicon generated.

External-link checking found no confirmed dead third-party content links. The local network timed out on arXiv, Google Scholar, and one Google Sites page; these links were retained because they are existing or independently verified academic-profile links. The currently public site returns 404 for the new `/news/` and `/people/` routes until this migration is deployed; both routes exist and pass the generated-site internal crawl.

## Information requiring confirmation

1. Full titles, author lists, links, and final bibliographic details for the 2026 TMC, TCOM, ICDCS, VTC-Spring workshop, ICC workshop, and GLOBECOM News items.
2. Current students and group members: names, roles, research topics, profile links, photos, and preferred ordering.
3. Teaching: course titles, semesters, level, role, and any public materials.
4. A current PDF CV, if a download button is wanted.
5. ORCID. A candidate identifier was found in third-party indexing but was deliberately not published without confirmation.
6. Exact postdoctoral dates, degree disciplines, office room/phone, and whether the public title should be “Associate Professor” or “Tenure-track Associate Professor.”
7. Author-hosted PDFs, code repositories, project pages, videos, or slides for publications.
8. A dedicated 1200 × 630 social-preview graphic and 180 × 180 Apple touch icon, if preferred over the current profile image and emoji favicon.
9. Optional Google Analytics, Google Search Console, and Bing Webmaster verification identifiers.

## Rollback

If deployment needs to be reversed, restore `master` from `backup/pre-al-folio-20260827` and rerun the deployment workflow. The backup points to the exact pre-migration source commit.
