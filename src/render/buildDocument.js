import { renderCover } from "./renderCover";
import { renderPrelims } from "./renderPrelims";
import { renderToc } from "./renderToc";
import { renderSections } from "./renderSections";
import { renderReferences } from "./renderReferences";
import { computeNumbers } from "../lib/computeNumbers";

export function buildDocument(report) {
  const labels = computeNumbers(report.sections);
  const hasReferences = report.references.some((r) => r.text.trim());
  const toc = report.layout.toc ? renderToc(report.sections, labels, hasReferences) : "";

  return `<div class="paged-doc">
    <div class="cover-doc">${renderCover(report.cover)}</div>
    <div class="prelims-doc">
      ${renderPrelims(report.prelims)}
      ${toc}
    </div>
    <div class="main-doc">
      ${renderSections(report.sections, labels)}
      ${renderReferences(report.references)}
    </div>
  </div>`;
}