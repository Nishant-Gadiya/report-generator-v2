import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useReport } from "./state/useReport";
import { loadReport } from "./lib/storage";
import { readProject, downloadProject } from "./lib/projectFile";
import { checkReport } from "./lib/checkReport";
import ReportPreview from "./components/ReportPreview";
import PagedView from "./components/PagedView";
import StartScreen from "./components/StartScreen";
import TopBar from "./components/TopBar";
import StepRail from "./components/StepRail";
import ExportCheck from "./components/ExportCheck";
import CoverEditor from "./components/CoverEditor";
import PrelimsEditor from "./components/PrelimsEditor";
import SectionsEditor from "./components/SectionsEditor";
import ReferencesEditor from "./components/ReferencesEditor";
import StyleEditor from "./components/StyleEditor";
import LayoutEditor from "./components/LayoutEditor";

const STEPS = [
  { id: "cover", label: "Cover", title: "Cover page", hint: "Edit the text. Open “Customize” to change fonts, colors or hide lines." },
  { id: "front", label: "Front pages", title: "Acknowledgement and abstract", hint: "Both are optional. Switch on the ones you need." },
  { id: "content", label: "Content", title: "Sections", hint: "Add sections, then add text, images and tables in any order." },
  { id: "refs", label: "References", title: "References", hint: "Type each reference. Web addresses become links." },
  { id: "design", label: "Design", title: "Text style and page layout", hint: "Defaults follow the standard format. Change only if your college asks." },
];

const countSections = (list) => list.reduce((n, s) => n + 1 + countSections(s.children), 0);
const clampZoom = (z) => Math.min(1.5, Math.max(0.5, Math.round(z * 10) / 10));

export default function App() {
  const { report, setReport, saveOk, startFrom, replaceReport } = useReport();
  const [view, setView] = useState(() => (loadReport() ? "edit" : "start"));
  const [started, setStarted] = useState(() => !!loadReport());
  const [step, setStep] = useState("cover");
  const [issues, setIssues] = useState(null);
  const [notice, setNotice] = useState("");
  const [zoom, setZoom] = useState(0.8);

  function show(msg) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 4000);
  }

  function choose(presetId) {
    startFrom(presetId);
    setStep("cover");
    setStarted(true);
    setView("edit");
  }

  async function openFile(file) {
    try {
      replaceReport(await readProject(file));
      setStep("cover");
      setStarted(true);
      setView("edit");
      show("Project opened.");
    } catch (e) {
      show(e.message);
    }
  }

  function exportClick() {
    const found = checkReport(report);
    if (found.length) setIssues(found);
    else setView("pages");
  }

  const idx = STEPS.findIndex((s) => s.id === step);
  const current = STEPS[idx];
  const badges = {
    front: [report.prelims.acknowledgement.on, report.prelims.abstract.on].filter(Boolean).length,
    content: countSections(report.sections),
    refs: report.references.filter((r) => r.text.trim()).length,
  };

  let screen;
  if (view === "pages") {
    screen = <PagedView report={report} onBack={() => setView("edit")} />;
  } else if (view === "start") {
    screen = (
      <StartScreen
        onChoose={choose}
        onOpen={openFile}
        onCancel={started ? () => setView("edit") : undefined}
      />
    );
  } else {
    screen = (
      <div className="layout">
        <TopBar
          saveOk={saveOk}
          onNew={() => setView("start")}
          onSave={() => downloadProject(report)}
          onOpen={openFile}
          onExport={exportClick}
        />

        <StepRail steps={STEPS} current={step} onSelect={setStep} badges={badges} />

        <section className="editor-pane">
          <header className="pane-head">
            <div className="step-count">Step {idx + 1} of {STEPS.length}</div>
            <h2>{current.title}</h2>
            <p className="hint">{current.hint}</p>
          </header>

          <div className="pane-body">
            {step === "cover" && <CoverEditor cover={report.cover} setReport={setReport} />}
            {step === "front" && <PrelimsEditor prelims={report.prelims} setReport={setReport} />}
            {step === "content" && <SectionsEditor sections={report.sections} setReport={setReport} />}
            {step === "refs" && <ReferencesEditor references={report.references} setReport={setReport} />}
            {step === "design" && (
              <>
                <details className="fold" open>
                  <summary>Text style</summary>
                  <StyleEditor style={report.style} setReport={setReport} />
                </details>
                <details className="fold" open>
                  <summary>Page layout</summary>
                  <LayoutEditor report={report} setReport={setReport} />
                </details>
              </>
            )}
          </div>

          <footer className="step-nav">
            {idx > 0 ? (
              <button type="button" onClick={() => setStep(STEPS[idx - 1].id)}>← Back</button>
            ) : (
              <span />
            )}
            {idx < STEPS.length - 1 ? (
              <button type="button" className="primary" onClick={() => setStep(STEPS[idx + 1].id)}>
                Next: {STEPS[idx + 1].label} →
              </button>
            ) : (
              <button type="button" className="primary" onClick={exportClick}>
                Export PDF
              </button>
            )}
          </footer>
        </section>

        <main className="preview-pane">
          <div className="preview-bar">
            <span>Live preview. Exact page breaks appear in the exported PDF.</span>
            <div className="zoom">
              <button type="button" className="ghost" onClick={() => setZoom((z) => clampZoom(z - 0.1))} title="Zoom out">
                <ZoomOut size={15} />
              </button>
              <span>{Math.round(zoom * 100)}%</span>
              <button type="button" className="ghost" onClick={() => setZoom((z) => clampZoom(z + 0.1))} title="Zoom in">
                <ZoomIn size={15} />
              </button>
            </div>
          </div>
          <div className="preview-zoom" style={{ zoom }}>
            <ReportPreview report={report} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      {screen}
      {issues && (
        <ExportCheck
          issues={issues}
          onClose={() => setIssues(null)}
          onFix={(s) => { setStep(s); setIssues(null); }}
          onContinue={() => { setIssues(null); setView("pages"); }}
        />
      )}
      {notice && <div className="toast">{notice}</div>}
    </>
  );
}