import { useState } from "react";
import { useReport } from "./state/useReport";
import ReportPreview from "./components/ReportPreview";
import CoverEditor from "./components/CoverEditor";
import PrelimsEditor from "./components/PrelimsEditor";
import SectionsEditor from "./components/SectionsEditor";
import ReferencesEditor from "./components/ReferencesEditor";
import PageStyleEditor from "./components/PageStyleEditor";

const TABS = [
  { id: "cover", label: "Cover" },
  { id: "prelims", label: "Prelims" },
  { id: "sections", label: "Sections" },
  { id: "references", label: "References" },
  { id: "pagestyle", label: "Page style" },
];

export default function App() {
  const { report, setReport, newReport } = useReport();
  const [tab, setTab] = useState("cover");

  return (
    <div className="layout">
      <aside className="editor-pane">
        <button onClick={newReport}>New report</button>

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
        {tab === "pagestyle" && <PageStyleEditor pageStyle={report.pageStyle} setReport={setReport} />}
      </aside>

      <main className="preview-pane">
        <ReportPreview report={report} />
      </main>
    </div>
  );
}