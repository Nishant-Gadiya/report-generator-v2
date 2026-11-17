import { useReport } from "./state/useReport";

export default function App() {
  const { report, setReport, newReport } = useReport();

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="Report title"
        value={report.cover.fields.title}
        onChange={(e) =>
          setReport({
            ...report,
            cover: {
              ...report.cover,
              fields: { ...report.cover.fields, title: e.target.value },
            },
          })
        }
      />
      <button onClick={newReport}>New report</button>
      <pre>{JSON.stringify(report, null, 2)}</pre>
    </div>
  );
}