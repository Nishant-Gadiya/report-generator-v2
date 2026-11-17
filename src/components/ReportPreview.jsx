import { renderCover } from "../render/renderCover";
import { renderPrelims } from "../render/renderPrelims";
import { renderSections } from "../render/renderSections";
import { renderReferences } from "../render/renderReferences";
import { computeNumbers } from "../lib/computeNumbers";

export default function ReportPreview({ report }) {
  const labels = computeNumbers(report.sections);
  const { style } = report;

  const vars = {
    "--font": style.fontFamily,
    "--body": `${style.bodySize}pt`,
    "--heading": `${style.headingSize}pt`,
    "--lh": style.lineSpacing,
  };

  return (
    <>
      <div className="page">
        <div dangerouslySetInnerHTML={{ __html: renderCover(report.cover) }} />
      </div>

      <div style={vars} dangerouslySetInnerHTML={{ __html: renderPrelims(report.prelims) }} />

      <div className="page body-page" style={vars}>
        <div
          dangerouslySetInnerHTML={{
            __html:
              renderSections(report.sections, labels) + renderReferences(report.references),
          }}
        />
      </div>
    </>
  );
}