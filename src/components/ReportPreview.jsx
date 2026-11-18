import { renderCover } from "../render/renderCover";
import { renderPrelims } from "../render/renderPrelims";
import { renderSections } from "../render/renderSections";
import { renderReferences } from "../render/renderReferences";
import { computeNumbers } from "../lib/computeNumbers";
import { fontOf } from "../data/fonts";

export default function ReportPreview({ report }) {
  const labels = computeNumbers(report.sections);
  const { style } = report;

  const vars = {
    "--font": fontOf(style.fontId).stack,
    "--body": `${style.bodySize}pt`,
    "--heading": `${style.headingSize}pt`,
    "--lh": style.lineSpacing,
    "--text-align": style.textAlign,
    "--heading-align": style.headingAlign,
    "--text-color": style.textColor,
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