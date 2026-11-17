import { useState, useEffect } from "react";
import { createEmptyReport } from "../data/defaultReport";
import { loadReport, saveReport } from "../lib/storage";

export function useReport() {
  const [report, setReport] = useState(() => loadReport() ?? createEmptyReport());

  useEffect(() => {
    const t = setTimeout(() => saveReport(report), 500);
    return () => clearTimeout(t);
  }, [report]);

  const newReport = () => setReport(createEmptyReport());

  return { report, setReport, newReport };
}