# Google Search Console setup

The repository is ready for Google Search Console, but ownership verification and re-indexing require the site owner's Google account and a real verification token.

1. Add a URL-prefix property for `https://xian-hua.github.io/`.
2. Select the **HTML tag** verification method.
3. Copy only the token from the tag's `content` attribute into `google_site_verification` in `_config.yml`; do not paste the complete `<meta>` tag.
4. Set `enable_google_verification: true`, deploy, and verify ownership in Search Console.
5. Submit `https://xian-hua.github.io/sitemap.xml`.
6. Use URL Inspection to request indexing for:
   - `https://xian-hua.github.io/`
   - `https://xian-hua.github.io/publications/`
   - `https://xian-hua.github.io/cv/`
   - `https://xian-hua.github.io/news/`

Leave the verification field empty until Google issues a real token. Code changes cannot guarantee when Google will refresh a cached search result.
