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
        <h3 class="card-title font-weight-medium">Professional Service</h3>
        <ul class="card-text font-weight-light">#{list}</ul>
      </div>
    HTML

    article_end = page.output.rindex("</article>")
    return if article_end.nil?

    container_end = page.output.rindex("</div>", article_end)
    page.output.insert(container_end, section) unless container_end.nil?
  end
end

# Keep the starter thin while allowing narrowly scoped local CV templates to
# override the packaged renderers without owning al-folio's core `_includes` path.
Jekyll::Hooks.register :site, :after_init do |site|
  local_cv_includes = File.expand_path("../_cv_includes", __dir__)
  next unless Dir.exist?(local_cv_includes) && site.respond_to?(:includes_load_paths)

  site.includes_load_paths.delete(local_cv_includes)
  site.includes_load_paths.unshift(local_cv_includes)
end

# The CV plugin emits Bootstrap-style list-group markup while this site uses
# al-folio's Tailwind runtime without the site-wide Bootstrap compatibility
# layer. It also appends punctuation to location fields unconditionally.
# Keep these compatibility fixes scoped to CV pages.
Jekyll::Hooks.register :pages, :post_render do |page|
  SiteRenderFixes.apply_seo_description(page)
  page.output.sub!('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">')
  page.output.sub!(/(&copy;|©) Copyright /, '\1 ')

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
    page.output.sub!(
      /(<td[^>]*>)yuxianhua@dgut\.edu\.cn(<\/td>)/,
      '\1<a href="mailto:yuxianhua@dgut.edu.cn">yuxianhua@dgut.edu.cn</a>\2'
    )
    page.output.gsub!(
      "Room 1004, Zone A, Building 1, International Cooperation and Innovation Zone (国际合作创新区1栋A区1004), ",
      '<span class="cv-location-line">Room 1004, Zone A, Building 1</span><span class="cv-location-line">International Cooperation and Innovation Zone</span><span class="cv-location-line">(国际合作创新区1栋A区1004)</span> '
    )
    page.output.gsub!(/(<h3[^>]*>)Experience(<\/h3>)/, '\1Appointments\2')
    page.output.gsub!(/(<h3[^>]*>)Interests(<\/h3>)/, '\1Research Focus\2')
    page.output.gsub!(/(<h3[^>]*>)Projects(<\/h3>)/, '\1Research Funding\2')
    page.output.sub!("<b>Location</b>", "<b>Office</b>")

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

      .cv .cv-timeline-entry {
        align-items: start;
        column-gap: 1.25rem;
        display: grid;
        grid-template-columns: 7.75rem minmax(0, 1fr);
      }

      .cv .cv-timeline-list > .list-group-item {
        padding: 0.7rem 0;
      }

      .cv .date-column {
        min-width: 0;
        text-align: left;
        transform: none;
        width: 100%;
      }

      .cv .date-column .badge {
        display: inline-block;
        line-height: 1.25;
        max-width: none;
        min-width: 0;
        text-transform: none !important;
        transform: translateY(-0.1rem);
        white-space: nowrap;
        width: max-content;
      }

      .cv .cv-entry-content {
        min-width: 0;
        overflow-wrap: break-word;
      }

      .cv .cv-entry-organization,
      .cv .cv-entry-field,
      .cv .cv-entry-summary,
      .cv .cv-funding-agency,
      .cv .cv-funding-meta {
        font-size: 0.95rem;
      }

      .cv .cv-entry-field,
      .cv .cv-entry-summary {
        font-style: italic;
      }

      .cv .cv-funding-agency {
        margin-top: 0.4rem;
      }

      .cv .cv-funding-meta {
        color: var(--global-text-color);
        color: color-mix(in srgb, var(--global-text-color) 70%, var(--global-bg-color));
        margin-top: 0.15rem;
      }

      .cv-location-line {
        display: block;
      }

      @media (max-width: 576px) {
        .cv .cv-timeline-entry {
          grid-template-columns: minmax(0, 1fr);
          row-gap: 0.55rem;
        }

        .cv .date-column .badge {
          max-width: 100%;
        }
      }

      .cv-professional-service ul {
        margin-bottom: 0;
        padding-left: 1.2rem;
      }
    CSS
  elsif page.url == "/"
    profile_image = page.data.dig("profile", "image")
    profile_image_alt = page.data.dig("profile", "image_alt")
    if profile_image && profile_image_alt
      page.output.sub!(
        %(alt="#{CGI.escapeHTML(profile_image)}"),
        %(alt="#{CGI.escapeHTML(profile_image_alt)}")
      )
    end

    SiteRenderFixes.inject_styles(page, "about-site-refinements", <<~CSS)
      .post-header .desc {
        margin-bottom: 0.6rem;
      }

      .about-contact-line {
        align-items: baseline;
        clear: none;
        color: var(--global-text-color-light);
        display: flex;
        flex-wrap: wrap;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 400;
        gap: 0.25rem 1.15rem;
        line-height: 1.4;
        margin: 0 0 1.25rem;
      }

      .about-contact-line a {
        color: var(--global-text-color);
        font-weight: 400;
        text-decoration-color: var(--global-theme-color);
        text-decoration-line: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.15em;
      }

      .about-contact-line a:hover {
        color: var(--global-theme-color);
      }

      .about-contact-line a:focus-visible {
        color: var(--global-theme-color);
        outline: 2px solid var(--global-theme-color);
        outline-offset: 2px;
      }

      .profile .more-info {
        color: var(--global-text-color-light);
        font-family: inherit;
        font-size: 0.9rem;
        line-height: 1.45;
        margin: 0.55rem 0 0.25rem;
      }

      .profile .more-info p {
        display: block;
        margin: 0 0 0.2rem;
      }

      .profile .more-info p:last-child {
        margin-bottom: 0;
      }

      .profile .more-info .profile-office-start {
        margin-top: 0.55rem;
      }

      @media (min-width: 992px) {
        .profile.float-right {
          width: 35%;
        }

        .profile .more-info .profile-office-line {
          white-space: nowrap;
        }
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

        .about-contact-line {
          gap: 0.25rem 1rem;
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
