import { esc } from "../lib/escape";

// turn typed web addresses into clickable links
function linkify(escapedText) {
  return escapedText.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" class="ref-link">$1</a>'
  );
}

export function renderReferences(references) {
  const items = references.filter((r) => r.text.trim());
  if (items.length === 0) return "";

  const rows = items
    .map((r, i) => `<li><span class="ref-no">[${i + 1}]</span> ${linkify(esc(r.text))}</li>`)
    .join("");
  return `<section class="report-section references"><h2 id="references-heading">REFERENCES</h2><ol>${rows}</ol></section>`;
}