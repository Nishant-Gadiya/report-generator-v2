import { useEffect } from "react";

export default function ExportCheck({ issues, onFix, onContinue, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>Before you export</h3>
        <p className="hint">You may want to fix these first. You can still export anyway.</p>
        <ul className="issue-list">
          {issues.map((it, i) => (
            <li key={i}>
              <span>{it.text}</span>
              <button type="button" onClick={() => onFix(it.step)}>Fix</button>
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Keep editing</button>
          <button type="button" className="primary" onClick={onContinue}>Export anyway</button>
        </div>
      </div>
    </div>
  );
}