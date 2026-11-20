import { useRef } from "react";

const STARTERS = [
  {
    id: "vtu",
    title: "College mini project",
    text: "University-style cover with logos, degree line, students and guide.",
  },
  {
    id: "simple",
    title: "Activity / NSS report",
    text: "A simpler cover with a student table. Good for activity, lab or club reports.",
  },
];

export default function StartScreen({ onChoose, onOpen, onCancel }) {
  const fileRef = useRef(null);

  return (
    <div className="start">
      <h1>What are you writing today?</h1>
      <p className="hint">Pick a starting point. You can change everything later.</p>

      <div className="start-cards">
        {STARTERS.map((s) => (
          <button key={s.id} type="button" className="start-card" onClick={() => onChoose(s.id)}>
            <strong>{s.title}</strong>
            <span>{s.text}</span>
          </button>
        ))}
      </div>

      <div className="start-actions">
        <button type="button" onClick={() => fileRef.current.click()}>
          Open a saved project file
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>Cancel, back to my report</button>
        )}
      </div>

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

      {onCancel && (
        <p className="hint">
          Choosing a starting point replaces your current report. Save a project file first if you
          want to keep it.
        </p>
      )}
    </div>
  );
}