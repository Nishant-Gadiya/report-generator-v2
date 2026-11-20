import { useState, useEffect } from "react";
import { createEmptyReport } from "../data/defaultReport";
import { loadReport, saveReport } from "../lib/storage";

export function useReport() {
  const [report, setReport] = useState(() => loadReport() ?? createEmptyReport());
  const [saveOk, setSaveOk] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSaveOk(saveReport(report)), 500);
    return () => clearTimeout(t);
  }, [report]);

  const startFrom = (presetId) => setReport(createEmptyReport(presetId));
  const replaceReport = (r) => setReport(r);
  const newReport = () => startFrom("vtu");

  return { report, setReport, saveOk, startFrom, replaceReport, newReport };
}