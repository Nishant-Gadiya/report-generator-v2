import { esc } from "../lib/escape";
import { toParagraphs } from "../lib/text";

export function renderPrelims(prelims) {
  let html = "";

  if (prelims.acknowledgement.on) {
    html += `<div class="page prelim-page">
      <h2 class="prelim-title">ACKNOWLEDGEMENT</h2>
      ${toParagraphs(prelims.acknowledgement.text)}
    </div>`;
  }

  if (prelims.abstract.on) {
    const kw = prelims.abstract.keywords.trim()
      ? `<p><strong>Keywords:</strong> ${esc(prelims.abstract.keywords)}</p>`
      : "";
    html += `<div class="page prelim-page">
      <h2 class="prelim-title">ABSTRACT</h2>
      ${toParagraphs(prelims.abstract.text)}${kw}
    </div>`;
  }

  return html;
}