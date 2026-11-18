function FooterSlot({ label, slot, onChange }) {
  return (
    <div className="hf-row">
      <span className="hf-label">{label}</span>
      <select value={slot.kind} onChange={(e) => onChange({ kind: e.target.value })}>
        <option value="none">Empty</option>
        <option value="text">Text</option>
        <option value="pageNumber">Page number</option>
      </select>
      {slot.kind === "text" && (
        <input
          placeholder="Footer text"
          value={slot.text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      )}
    </div>
  );
}

export default function PageStyleEditor({ pageStyle, setReport }) {
  const update = (patch) =>
    setReport((r) => ({ ...r, pageStyle: { ...r.pageStyle, ...patch } }));
  const setHeader = (pos, value) =>
    update({ header: { ...pageStyle.header, [pos]: value } });
  const setFooter = (pos, patch) =>
    update({ footer: { ...pageStyle.footer, [pos]: { ...pageStyle.footer[pos], ...patch } } });

  return (
    <div className="prelim-card">
      <h3>Page style (all pages except the cover)</h3>

      <label>
        Style{" "}
        <select value={pageStyle.mode} onChange={(e) => update({ mode: e.target.value })}>
          <option value="none">None</option>
          <option value="single">Single border</option>
          <option value="double">Double border</option>
          <option value="headerFooter">Header and footer</option>
        </select>
      </label>

      {pageStyle.mode !== "headerFooter" && (
        <label className="prelim-toggle">
          <input
            type="checkbox"
            checked={pageStyle.showPageNumber}
            onChange={(e) => update({ showPageNumber: e.target.checked })}
          />
          Show page numbers at the bottom center
        </label>
      )}

      {pageStyle.mode === "headerFooter" && (
        <>
          <h4>Header</h4>
          <div className="hf-row">
            <span className="hf-label">Left</span>
            <input value={pageStyle.header.left} onChange={(e) => setHeader("left", e.target.value)} />
          </div>
          <div className="hf-row">
            <span className="hf-label">Center</span>
            <input value={pageStyle.header.center} onChange={(e) => setHeader("center", e.target.value)} />
          </div>
          <div className="hf-row">
            <span className="hf-label">Right</span>
            <input value={pageStyle.header.right} onChange={(e) => setHeader("right", e.target.value)} />
          </div>
          <label className="prelim-toggle">
            <input
              type="checkbox"
              checked={pageStyle.headerLine}
              onChange={(e) => update({ headerLine: e.target.checked })}
            />
            Line under the header
          </label>

          <h4>Footer</h4>
          <FooterSlot label="Left" slot={pageStyle.footer.left} onChange={(p) => setFooter("left", p)} />
          <FooterSlot label="Center" slot={pageStyle.footer.center} onChange={(p) => setFooter("center", p)} />
          <FooterSlot label="Right" slot={pageStyle.footer.right} onChange={(p) => setFooter("right", p)} />
          <label className="prelim-toggle">
            <input
              type="checkbox"
              checked={pageStyle.footerLine}
              onChange={(e) => update({ footerLine: e.target.checked })}
            />
            Line above the footer
          </label>
        </>
      )}

      <p className="hint">
        Page numbers are roman (i, ii) for the acknowledgement, abstract and contents, and 1, 2, 3
        for the main report. Keep header and footer texts short so they don't touch each other.
        You'll see them when you click Preview pages.
      </p>
    </div>
  );
}