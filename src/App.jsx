import { useState } from "react";
import { useReport } from "./state/useReport";
import ReportPreview from "./components/ReportPreview";
import PagedView from "./components/PagedView";
import CoverEditor from "./components/CoverEditor";
import PrelimsEditor from "./components/PrelimsEditor";
import SectionsEditor from "./components/SectionsEditor";
import ReferencesEditor from "./components/ReferencesEditor";
import StyleEditor from "./components/StyleEditor";
import LayoutEditor from "./components/LayoutEditor";

const TABS = [
  { id: "cover", label: "Cover" },
  { id: "prelims", label: "Prelims" },
  { id: "sections", label: "Sections" },
  { id: "references", label: "References" },
  { id: "text", label: "Text style" },
  { id: "layout", label: "Layout" },
];

export default function App() {
  const { report, setReport, newReport } = useReport();
  const [tab, setTab] = useState("cover");
  const [view, setView] = useState("edit");

  if (view === "pages") {
    return <PagedView report={report} onBack={() => setView("edit")} />;
  }

  return (
    <div className="layout">
      <aside className="editor-pane">
        <div className="top-actions">
          <button onClick={newReport}>New report</button>
          <button className="primary" onClick={() => setView("pages")}>
            Preview pages / Export PDF
          </button>
        </div>

        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "active" : ""}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "cover" && <CoverEditor cover={report.cover} setReport={setReport} />}
        {tab === "prelims" && <PrelimsEditor prelims={report.prelims} setReport={setReport} />}
        {tab === "sections" && <SectionsEditor sections={report.sections} setReport={setReport} />}
        {tab === "references" && (
          <ReferencesEditor references={report.references} setReport={setReport} />
        )}
        {tab === "text" && <StyleEditor style={report.style} setReport={setReport} />}
        {tab === "layout" && <LayoutEditor report={report} setReport={setReport} />}
      </aside>

      <main className="preview-pane">
        <ReportPreview report={report} />
      </main>
    </div>
  );
}