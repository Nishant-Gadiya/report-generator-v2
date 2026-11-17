const KEY = "report-generator-v2";

export function loadReport() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveReport(report) {
  try {
    localStorage.setItem(KEY, JSON.stringify(report));
    return true;
  } catch {
    return false;
  }
}