import { useRef } from "react";
import { Download, FolderOpen, FilePlus, FileDown, Check, AlertTriangle } from "lucide-react";

export default function TopBar({ saveOk, onNew, onSave, onOpen, onExport }) {
  const fileRef = useRef(null);

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">R</span>
        <span>Report Generator</span>
      </div>

      <div className={`save-state ${saveOk ? "ok" : "bad"}`}>
        {saveOk ? (
          <>
            <Check size={14} /> Saved in this browser
          </>
        ) : (
          <>
            <AlertTriangle size={14} /> Storage full. Save a project file.
          </>
        )}
      </div>

      <div className="topbar-actions">
        <button type="button" className="ghost" onClick={() => fileRef.current.click()}>
          <FolderOpen size={15} /> Open
        </button>
        <button type="button" className="ghost" onClick={onSave}>
          <Download size={15} /> Save file
        </button>
        <button type="button" className="ghost" onClick={onNew}>
          <FilePlus size={15} /> New
        </button>
        <button type="button" className="primary" onClick={onExport}>
          <FileDown size={15} /> Export PDF
        </button>
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
    </header>
  );
}