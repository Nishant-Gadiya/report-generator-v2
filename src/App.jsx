import { useReport } from "./state/useReport";
import CoverPreview from "./components/CoverPreview";

export default function App() {
  const { report, setReport, newReport } = useReport();

  return (
    <div style={{ padding: 20 }}>
      <button onClick={newReport}>New report</button>
      <CoverPreview cover={report.cover} />
    </div>
  );
}