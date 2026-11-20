import { useRef } from "react";

export default function StepRail({ steps, current, onSelect, badges, saveOk, onNew, onSave, onOpen }) {
  const fileRef = useRef(null);

  return (
    <nav className="rail">
      <div className="rail-brand">Report Generator</div>

      <ol className="rail-steps">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={current === s.id ? "active" : ""}
              onClick={() => onSelect(s.id)}
            >
              <span className="rail-num">{i + 1}</span>
              <span className="rail-label">{s.label}</span>
              {badges[s.id] ? <span className="rail-badge">{badges[s.id]}</span> : null}
            </button>
          </li>
        ))}
      </ol>

      <div className="rail-foot">
        <p className={saveOk ? "save-ok" : "save-bad"}>
          {saveOk ? "✓ Saved in this browser" : "⚠ Could not save: storage is full. Save a project file."}
        </p>
        <button type="button" onClick={onSave}>Save project file</button>
        <button type="button" onClick={() => fileRef.current.click()}>Open project file</button>
        <button type="button" onClick={onNew}>New report</button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={(e) => {
            const f = e.target.files[0];
            if (f) onOpen(f);
            e.target.value = "";
          }}
        />
      </div>
    </nav>
  );
}