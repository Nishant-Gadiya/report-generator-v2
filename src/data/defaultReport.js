import { VTU_STYLE } from "./coverPresets";

export function createEmptyReport() {
  return {
    cover: {
      ...structuredClone(VTU_STYLE),
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
    style: { fontFamily: "Times New Roman", headingSize: 14, bodySize: 12, lineSpacing: 1.5 },
    pageStyle: {
  mode: "none",            // "none" | "single" | "double" | "headerFooter"
  showPageNumber: true,    // used by none / single / double
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