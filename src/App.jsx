import { useReport } from "./state/useReport";
import CoverPreview from "./components/CoverPreview";
import CoverEditor from "./components/CoverEditor";

export default function App() {
  const { report, setReport, newReport } = useReport();

  return (
    <div className="layout">
      <aside className="editor-pane">
        <button onClick={newReport}>New report</button>
        <CoverEditor cover={report.cover} setReport={setReport} />
      </aside>
      <main className="preview-pane">
        <CoverPreview cover={report.cover} />
      </main>
    </div>
  );
}