import Segmented from "./Segmented";
import LayoutSummary from "./LayoutSummary";
import PageStyleEditor from "./PageStyleEditor";

export default function LayoutEditor({ report, setReport }) {
  const { layout, pageStyle } = report;
  const update = (patch) =>
    setReport((r) => ({ ...r, layout: { ...r.layout, ...patch } }));

  return (
    <div>
      <LayoutSummary pageStyle={pageStyle} layout={layout} />

      <div className="prelim-card">
        <h3>Document</h3>
        <div className="field-row">
          <span>Margins</span>
          <Segmented
            value={layout.margins}
            options={[
              { value: "narrow", label: "Narrow" },
              { value: "normal", label: "Normal" },
              { value: "wide", label: "Wide" },
            ]}
            onChange={(margins) => update({ margins })}
          />
        </div>
        <label className="prelim-toggle">
          <input type="checkbox" checked={layout.toc} onChange={(e) => update({ toc: e.target.checked })} />
          Include table of contents
        </label>
        <label className="prelim-toggle">
          <input
            type="checkbox"
            checked={layout.referencesNewPage}
            onChange={(e) => update({ referencesNewPage: e.target.checked })}
          />
          References start on a new page
        </label>
      </div>

      <PageStyleEditor pageStyle={pageStyle} setReport={setReport} />
    </div>
  );
}