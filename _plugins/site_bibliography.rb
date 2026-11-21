# frozen_string_literal: true

require "jekyll/scholar"
require "nokogiri"

# Keep al-folio's author formatting, DOI links, and syntax-highlighted BibTeX.
# Add citation details from the very same entry passed to its bibliography layout.
class SiteBibliography < Jekyll::Scholar::BibliographyTag
  def bibliography_tag(entry, index)
    card = Nokogiri::HTML5.fragment(super)
    venue = card.at_css(".periodical em")
    if venue
      details = citation_details(entry)
      venue.add_next_sibling(Nokogiri::XML::Text.new(", #{details}", card.document)) unless details.empty?
    end

    toggle = card.at_css(".links a.bibtex")
    panel = card.at_css("div.bibtex")
    if toggle && panel
      panel["id"] = "bibtex-#{entry.key}"
      panel.remove_class("hidden")
      panel["hidden"] = ""
      toggle.name = "button"
      toggle.remove_attribute("role")
      toggle["type"] = "button"
      toggle["aria-controls"] = panel["id"]
      toggle["aria-expanded"] = "false"
    end
    card.to_html
  end

  private

  def citation_details(entry)
    volume = entry[:volume].to_s
    issue = entry[:number].to_s
    pages = entry[:pages].to_s.gsub(/-{1,3}(?=\d)/, "–")
    fields = []
    fields << "vol. #{volume}" unless volume.empty?
    fields << "no. #{issue}" unless issue.empty?
    unless pages.empty?
      prefix = pages.match?(/[–—,]/) ? "pp." : "p."
      fields << "#{prefix} #{pages}"
    end
    fields.join(", ")
  end
end

Liquid::Template.register_tag("site_bibliography", SiteBibliography)
