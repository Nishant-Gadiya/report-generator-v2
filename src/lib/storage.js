const KEY = "report-generator-v2";
const SCHEMA_VERSION = 6; // bump this whenever the report structure changes

export function loadReport() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (saved.version !== SCHEMA_VERSION) return null; // old shape: start fresh
    return saved.report;
  } catch {
    return null;
  }
}

export function saveReport(report) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ version: SCHEMA_VERSION, report }));
    return true;
  } catch {
    return false;
  }
}