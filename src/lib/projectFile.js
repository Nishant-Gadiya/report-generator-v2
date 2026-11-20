import { SCHEMA_VERSION } from "./storage";

export function downloadProject(report) {
  const data = JSON.stringify(
    { app: "report-generator", version: SCHEMA_VERSION, report },
    null,
    2
  );
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `report-project-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function readProject(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error("This file is not a valid project file.");
  }
  if (data?.app !== "report-generator" || !data.report) {
    throw new Error("This is not a report project file.");
  }
  if (data.version !== SCHEMA_VERSION) {
    throw new Error("This project was saved with a different version of the app.");
  }
  const r = data.report;
  if (!r.cover || !r.sections || !r.style || !r.pageStyle || !r.layout) {
    throw new Error("This project file is incomplete.");
  }
  return r;
}