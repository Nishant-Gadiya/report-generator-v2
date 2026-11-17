export default function PageStyleEditor({ pageStyle, setReport }) {
  const update = (patch) =>
    setReport((r) => ({ ...r, pageStyle: { ...r.pageStyle, ...patch } }));

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

      {pageStyle.mode === "headerFooter" && (
        <>
          <input
            placeholder="Header text (e.g. report title or college name)"
            value={pageStyle.headerText}
            onChange={(e) => update({ headerText: e.target.value })}
          />
          <input
            placeholder="Footer text (e.g. Dept. of ISE, JSSATE)"
            value={pageStyle.footerText}
            onChange={(e) => update({ footerText: e.target.value })}
          />
        </>
      )}

      <label className="prelim-toggle">
        <input
          type="checkbox"
          checked={pageStyle.showPageNumber}
          onChange={(e) => update({ showPageNumber: e.target.checked })}
        />
        Show page numbers
      </label>

      <p className="hint">
        Page numbers use roman numerals (i, ii) for the acknowledgement and abstract, and 1, 2, 3
        for the main report. The real pages appear when you export.
      </p>
    </div>
  );
}