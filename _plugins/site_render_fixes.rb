# frozen_string_literal: true

# The CV plugin emits Bootstrap-style list-group markup while this site uses
# al-folio's Tailwind runtime without the site-wide Bootstrap compatibility
# layer. It also appends punctuation to location fields unconditionally.
# Keep these compatibility fixes scoped to CV pages.
Jekyll::Hooks.register :pages, :post_render do |page|
  if page.data["layout"] == "cv"
    page.output.gsub!(
      "New Campus, Building 1, Zone A, Room 1004（新区1栋A区1004）, ",
      "New Campus, Building 1, Zone A, Room 1004（新区1栋A区1004） "
    )

    next unless page.output.include?("</head>")

    styles = <<~HTML
      <style id="cv-list-marker-fix">
        .cv ul.list-group,
        .cv li.list-group-item {
          list-style: none;
        }

        .cv ul.list-group {
          padding-left: 0;
        }
      </style>
    HTML

    page.output.sub!("</head>", "#{styles}</head>")
  elsif page.url == "/publications/"
    next unless page.output.include?("</head>")

    styles = <<~HTML
      <style id="publication-year-contrast">
        .publications h2.bibliography {
          color: var(--global-text-color);
          font-weight: 500;
          opacity: 0.72;
        }
      </style>
    HTML

    page.output.sub!("</head>", "#{styles}</head>")
  end
end
