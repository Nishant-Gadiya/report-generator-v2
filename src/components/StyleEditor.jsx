import Segmented from "./Segmented";
import { FONTS } from "../data/fonts";
import { DEFAULT_STYLE } from "../data/defaultReport";

const HEADING_SIZES = [12, 13, 14, 15, 16, 18, 20];
const BODY_SIZES = [10, 11, 12, 13, 14];
const SPACINGS = [1, 1.15, 1.5, 2];

export default function StyleEditor({ style, setReport }) {
  const update = (patch) => setReport((r) => ({ ...r, style: { ...r.style, ...patch } }));
  const reset = () => setReport((r) => ({ ...r, style: { ...DEFAULT_STYLE } }));

  return (
    <div className="prelim-card">
      <h3>Text style</h3>
      <p className="hint">Applies to the abstract, sections and references. Standard: Times New Roman, headings 14, text 12, line spacing 1.5.</p>

      <div className="field-row">
        <span>Font</span>
        <Segmented
          value={style.fontId}
          options={FONTS.map((f) => ({ value: f.id, label: f.label }))}
          onChange={(fontId) => update({ fontId })}
        />
      </div>

      <div className="field-row">
        <label>
          Heading size{" "}
          <select value={style.headingSize} onChange={(e) => update({ headingSize: Number(e.target.value) })}>
            {HEADING_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>
          Text size{" "}
          <select value={style.bodySize} onChange={(e) => update({ bodySize: Number(e.target.value) })}>
            {BODY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>
          Line spacing{" "}
          <select value={style.lineSpacing} onChange={(e) => update({ lineSpacing: Number(e.target.value) })}>
            {SPACINGS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div className="field-row">
        <span>Headings</span>
        <Segmented
          value={style.headingAlign}
          options={[{ value: "left", label: "Left" }, { value: "center", label: "Centered" }]}
          onChange={(headingAlign) => update({ headingAlign })}
        />
      </div>

      <div className="field-row">
        <span>Text</span>
        <Segmented
          value={style.textAlign}
          options={[{ value: "justify", label: "Justified" }, { value: "left", label: "Left" }]}
          onChange={(textAlign) => update({ textAlign })}
        />
      </div>

      <div className="field-row">
        <label>
          Text color{" "}
          <input type="color" value={style.textColor} onChange={(e) => update({ textColor: e.target.value })} />
        </label>
        <button type="button" onClick={reset}>Reset to standard</button>
      </div>
    </div>
  );
}