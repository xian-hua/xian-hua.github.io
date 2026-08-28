# frozen_string_literal: true

require "cgi"
require "json"

module SiteRenderFixes
  module_function

  def inject_styles(page, id, css)
    return unless page.output.include?("</head>")

    page.output.sub!("</head>", %(<style id="#{id}">\n#{css}\n</style>\n</head>))
  end

  def apply_seo_description(page)
    description = page.data["seo_description"]
    return if description.nil? || description.empty?

    escaped = CGI.escapeHTML(description)
    page.output.sub!(/<meta name="description" content="[^"]*">/m, %(<meta name="description" content="#{escaped}">))
    page.output.sub!(/<meta property="og:description" content="[^"]*">/m, %(<meta property="og:description" content="#{escaped}">))
    page.output.sub!(/<meta name="twitter:description" content="[^"]*">/m, %(<meta name="twitter:description" content="#{escaped}">))

    page.output.gsub!(%r{<script type="application/ld\+json">(.*?)</script>}m) do |script|
      json = JSON.parse(Regexp.last_match(1))
      json["description"] = description
      %(<script type="application/ld+json">\n#{JSON.pretty_generate(json)}\n</script>)
    rescue JSON::ParserError
      script
    end
  end

  def add_cv_service(page)
    items = Array(page.data["professional_service"])
    return if items.empty?

    list = items.map { |item| "<li>#{CGI.escapeHTML(item)}</li>" }.join
    section = <<~HTML
      <a class="anchor" id="professional-service"></a>
      <div class="card mt-3 p-3 cv-professional-service">
        <h3 class="card-title font-weight-medium">Selected Professional Service</h3>
        <ul class="card-text font-weight-light">#{list}</ul>
      </div>
    HTML

    article_end = page.output.rindex("</article>")
    return if article_end.nil?

    container_end = page.output.rindex("</div>", article_end)
    page.output.insert(container_end, section) unless container_end.nil?
  end
end

# The CV plugin emits Bootstrap-style list-group markup while this site uses
# al-folio's Tailwind runtime without the site-wide Bootstrap compatibility
# layer. It also appends punctuation to location fields unconditionally.
# Keep these compatibility fixes scoped to CV pages.
Jekyll::Hooks.register :pages, :post_render do |page|
  SiteRenderFixes.apply_seo_description(page)
  page.output.sub!('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">')

  page.output.sub!(/<header class="post-header">(.*?)<\/header>/m) do
    "<div class=\"post-header\">#{Regexp.last_match(1)}</div>"
  end
  page.output.gsub!("<pre>", '<pre tabindex="0">')

  SiteRenderFixes.inject_styles(page, "global-accessibility-refinements", <<~CSS)
    [role="main"] article p a:not(.btn),
    [role="main"] article td a:not(.btn),
    footer a {
      text-decoration: underline;
      text-underline-offset: 0.12em;
    }

    pre:focus-visible {
      outline: 2px solid var(--global-theme-color);
      outline-offset: 2px;
    }
  CSS

  if page.data["layout"] == "cv"
    page.output.gsub!(
      "Room 1004, Zone A, Building 1, Songshan Lake Campus (新区1栋A区1004), ",
      "Room 1004, Zone A, Building 1, Songshan Lake Campus (新区1栋A区1004) "
    )
    page.output.gsub!(/(<h3[^>]*>)Experience(<\/h3>)/, '\1Appointments\2')
    page.output.gsub!(/(<h3[^>]*>)Interests(<\/h3>)/, '\1Research Focus\2')
    page.output.gsub!(/(<h3[^>]*>)Projects(<\/h3>)/, '\1Research Funding\2')
    page.output.gsub!("2027 - 2029", "Jan. 2027–Dec. 2029")
    page.output.gsub!("2025 - 2027", "Jan. 2025–Dec. 2027")
    page.output.sub!(/(<h3[^>]*>Research Funding<\/h3>)/, '\1<p class="cv-translation-note">English project titles are descriptive translations.</p>')

    links = <<~HTML
      <div class="cv-primary-links" aria-label="CV links">
        <a href="mailto:yuxianhua@dgut.edu.cn" aria-label="Email Xianhua Yu">Email</a>
        <a href="https://scholar.google.com/citations?user=mR4CJ4IAAAAJ&amp;hl=en" target="_blank" rel="external noopener" aria-label="Google Scholar profile (opens in a new tab)">Google Scholar</a>
        <a href="/" aria-label="Xianhua Yu homepage">Homepage</a>
      </div>
    HTML
    page.output.sub!(/(<h1[^>]*>\s*CV\s*<\/h1>)/, "\\1#{links}")
    SiteRenderFixes.add_cv_service(page)
    page.output.gsub!(/<h3([^>]*class="[^"]*card-title[^"]*"[^>]*)>/, '<h2\1>')
    page.output.gsub!("</h3>", "</h2>")
    page.output.gsub!(/<h6([^>]*)>/, '<div\1>')
    page.output.gsub!("</h6>", "</div>")

    SiteRenderFixes.inject_styles(page, "cv-site-refinements", <<~CSS)
      .cv ul.list-group,
      .cv li.list-group-item {
        list-style: none;
      }

      .cv ul.list-group {
        padding-left: 0;
      }

      .cv-primary-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem 1rem;
        margin: 0.25rem 0 1rem;
      }

      .cv-primary-links a {
        min-height: 2rem;
      }

      .cv .date-column .badge {
        line-height: 1.25;
        max-width: 9rem;
        text-transform: none !important;
        white-space: normal;
      }

      .cv-translation-note {
        color: var(--global-text-color);
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
      }

      .cv-professional-service ul {
        margin-bottom: 0;
        padding-left: 1.2rem;
      }
    CSS
  elsif page.url == "/"
    page.output.gsub!(">selected publications<", ">Selected Publications<")
    SiteRenderFixes.inject_styles(page, "about-site-refinements", <<~CSS)
      .about-academic-links {
        clear: both;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem 1.1rem;
        margin: 0.25rem 0 1rem;
      }

      .about-academic-links a {
        align-items: center;
        display: inline-flex;
        min-height: 2.25rem;
      }

      .research-identity {
        font-size: 1.05rem;
        line-height: 1.6;
        margin: 0 0 1.25rem;
      }

      .research-methodology {
        border-left: 2px solid var(--global-theme-color);
        margin: 0.75rem 0 1.5rem;
        padding: 0.3rem 0 0.3rem 0.9rem;
      }

      @media (max-width: 576px) {
        .profile.float-right {
          float: none !important;
          margin: 0 auto 1.25rem;
          max-width: 280px;
          width: 100%;
        }

        .about-academic-links {
          gap: 0.25rem 0.9rem;
        }
      }
    CSS
  elsif page.url == "/publications/"
    SiteRenderFixes.inject_styles(page, "publication-year-contrast", <<~CSS)
      .publications h2.bibliography {
        color: var(--global-text-color);
        font-weight: 500;
        opacity: 0.72;
      }
    CSS
  end
end
