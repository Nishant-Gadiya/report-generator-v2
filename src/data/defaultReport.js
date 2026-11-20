import { COVER_PRESETS } from "./coverPresets";

export const DEFAULT_STYLE = {
  fontId: "times",
  headingSize: 14,
  bodySize: 12,
  lineSpacing: 1.5,
  headingAlign: "left",   // "left" | "center"
  textAlign: "justify",   // "justify" | "left"
  textColor: "#000000",
};

export function createEmptyReport(presetId = "vtu") {
  return {
    cover: {
      ...structuredClone(COVER_PRESETS[presetId] ?? COVER_PRESETS.vtu),
      students: [
        { id: crypto.randomUUID(), name: "Student Name 1", usn: "USN" },
        { id: crypto.randomUUID(), name: "Student Name 2", usn: "USN" },
      ],
      images: {},
    },
    prelims: {
      acknowledgement: { on: false, text: "" },
      abstract: { on: false, text: "", keywords: "" },
    },
    sections: [],
    references: [],
    style: { ...DEFAULT_STYLE },
    layout: { margins: "normal", toc: true, referencesNewPage: false },
    pageStyle: {
      mode: "none",
      showPageNumber: true,
      header: { left: "", center: "", right: "" },
      footer: {
        left: { kind: "none", text: "" },
        center: { kind: "none", text: "" },
        right: { kind: "pageNumber", text: "" },
      },
      headerLine: true,
      footerLine: true,
    },
  };
}