const POS = ["left", "center", "right"];

export default function LayoutSummary({ pageStyle: ps, layout }) {
  const hf = ps.mode === "headerFooter";
  const modeLabel = {
    none: "No border",
    single: "Single border",
    double: "Double border",
    headerFooter: "Header and footer",
  }[ps.mode];

  const headerCell = (pos) => (hf ? ps.header[pos] : "");
  const footerCell = (pos) => {
    if (hf) {
      const s = ps.footer[pos];
      return s.kind === "pageNumber" ? "1" : s.kind === "text" ? s.text : "";
    }
    return pos === "center" && ps.showPageNumber ? "1" : "";
  };

  const headerCount = hf ? POS.filter((p) => ps.header[p].trim()).length : 0;
  const footerCount = hf ? POS.filter((p) => ps.footer[p].kind !== "none").length : 0;
  const numberPos = hf
    ? POS.find((p) => ps.footer[p].kind === "pageNumber")
    : ps.showPageNumber ? "center" : null;

  const miniClass =
    ps.mode === "single" || ps.mode === "double" ? `mini-${ps.mode}` : "";

  return (
    <div className="summary">
      <div className={`mini-page ${miniClass}`}>
        <div className={`mini-row ${hf && ps.headerLine ? "line-b" : ""}`}>
          {POS.map((p) => <span key={p}>{headerCell(p)}</span>)}
        </div>
        <div className="mini-body"><i /><i /><i /><i /><i /><i /></div>
        <div className={`mini-row ${hf && ps.footerLine ? "line-t" : ""}`}>
          {POS.map((p) => <span key={p}>{footerCell(p)}</span>)}
        </div>
      </div>

      <ul className="summary-list">
        <li><b>Style</b> {modeLabel}</li>
        <li><b>Header</b> {hf ? (headerCount ? `${headerCount} item(s)` : "Empty") : "Off"}</li>
        <li><b>Footer</b> {hf ? (footerCount ? `${footerCount} item(s)` : "Empty") : "Off"}</li>
        <li><b>Page numbers</b> {numberPos ? `Bottom ${numberPos}` : "Off"}</li>
        <li><b>Margins</b> {layout.margins[0].toUpperCase() + layout.margins.slice(1)}</li>
        <li><b>Contents page</b> {layout.toc ? "On" : "Off"}</li>
      </ul>
    </div>
  );
}