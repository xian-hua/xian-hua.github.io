# frozen_string_literal: true

# The CV plugin emits Bootstrap-style list-group markup while this site uses
# al-folio's Tailwind runtime without the site-wide Bootstrap compatibility
# layer. Scope the missing list reset to CV pages so the main navbar is not
# affected by compatibility-layer collapse rules.
Jekyll::Hooks.register :pages, :post_render do |page|
  next unless page.data["layout"] == "cv"
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
end
