import { fontOf } from "../data/fonts";

// makes header/footer text safe to put inside CSS
const cssStr = (s) =>
  `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\s+/g, " ")}"`;

const MARGINS = {
  narrow: { v: 20, h: 15 },
  normal: { v: 25, h: 20 },
  wide: { v: 30, h: 25 },
};

export function buildPagedCss(report) {
  const { style, pageStyle: ps, layout } = report;
  const font = fontOf(style.fontId).stack;
  const m = MARGINS[layout.margins] ?? MARGINS.normal;
  const headerFooter = ps.mode === "headerFooter";
  const border =
    ps.mode === "single" ? "1.5pt solid #000" : ps.mode === "double" ? "4.5pt double #000" : "";

  const box = (name, content, size) =>
    `@${name} { content: ${content}; font-family: ${font}; font-size: ${size}; }`;

  const margins = (numberFormat) => {
    let css = "";
    if (headerFooter) {
      ["left", "center", "right"].forEach((pos) => {
        const text = ps.header[pos].trim();
        if (text) css += box(`top-${pos}`, cssStr(text), "10pt");

        const slot = ps.footer[pos];
        if (slot.kind === "text" && slot.text.trim()) {
          css += box(`bottom-${pos}`, cssStr(slot.text), "10pt");
        }
        if (slot.kind === "pageNumber") {
          css += box(`bottom-${pos}`, "var(--page-label)", "11pt");
        }
      });
    } else if (ps.showPageNumber) {
      css += box("bottom-center", "var(--page-label)", "11pt");
    }
    return css;
  };

  const borderCss = border
    ? `
.pagedjs_page:not(.pagedjs_cover_page)::before {
  content: "";
  position: absolute;
  top: 10mm; left: 10mm; right: 10mm; bottom: 10mm;
  border: ${border};
  pointer-events: none;
  z-index: 10;
}`
    : "";

  const lineLayers = [];
  if (headerFooter && ps.headerLine) lineLayers.push("top");
  if (headerFooter && ps.footerLine) lineLayers.push("bottom");

  const linesCss = lineLayers.length
    ? `
.pagedjs_page:not(.pagedjs_cover_page)::after {
  content: "";
  position: absolute;
  top: 0; bottom: 0; left: ${m.h}mm; right: ${m.h}mm;
  pointer-events: none;
  background-repeat: no-repeat;
  background-image: ${lineLayers.map(() => "linear-gradient(#000, #000)").join(", ")};
  background-position: ${lineLayers.map((l) => `left 0 ${l} ${m.v - 4}mm`).join(", ")};
  background-size: ${lineLayers.map(() => "100% 0.75pt").join(", ")};
}`
    : "";

  const refsBreak = layout.referencesNewPage ? ".main-doc .references { break-before: page; }" : "";

  return `
@page { size: A4; margin: ${m.v}mm ${m.h}mm; }
@page cover { margin: 10mm; }
@page prelims { margin: ${m.v}mm ${m.h}mm; ${margins(", lower-roman")} }
@page main { margin: ${m.v}mm ${m.h}mm; ${margins("")} }

.cover-doc { page: cover; }
.prelims-doc { page: prelims; }
.main-doc { page: main; }

.paged-doc {
  --font: ${font};
  --body: ${style.bodySize}pt;
  --heading: ${style.headingSize}pt;
  --lh: ${style.lineSpacing};
  --text-align: ${style.textAlign};
  --heading-align: ${style.headingAlign};
  --text-color: ${style.textColor};
  font-family: var(--font);
  font-size: var(--body);
  line-height: var(--lh);
  color: var(--text-color);
}

/* undo the editing-screen styles that don't belong in real pages */
.paged-doc .page { width: auto; min-height: 0; margin: 0; padding: 0; box-shadow: none; background: none; }
.paged-doc .prelim-page { padding: 0; }
.paged-doc .cover { height: 272mm; line-height: 1.25; }

/* page breaks */
.prelims-doc > * + * { break-before: page; }
.paged-doc .break-page { break-before: page; }
.paged-doc .report-section { margin-top: 18pt; }
.paged-doc .report-sub { margin-top: 12pt; }
.main-doc > .report-section:first-child { break-before: auto; margin-top: 0; }
${refsBreak}

/* text */
.paged-doc h2, .paged-doc h3, .paged-doc h4, .paged-doc h5 {
  font-size: var(--heading); break-after: avoid; text-align: var(--heading-align);
}
.paged-doc h2 { text-transform: uppercase; }
.paged-doc .prelim-title { text-align: center; }
.paged-doc p { margin: 0 0 8pt; text-align: var(--text-align); }
.paged-doc figure { break-inside: avoid; margin: 12pt 0; text-align: center; }
.paged-doc img { max-width: 100%; max-height: 120mm; }
.paged-doc .table-caption { break-after: avoid; }
.paged-doc tr { break-inside: avoid; }

/* table of contents */
.toc { list-style: none; padding: 0; margin: 0; }
.toc li { margin: 4pt 0; }
.toc a { display: flex; justify-content: space-between; gap: 8pt; color: inherit; text-decoration: none; }
.toc-page { white-space: nowrap; }
.toc-d2 { padding-left: 14pt; }
.toc-d3 { padding-left: 28pt; }
.toc-d4 { padding-left: 42pt; }

.pagedjs_page { position: relative; }
${borderCss}
${linesCss}
`;
}