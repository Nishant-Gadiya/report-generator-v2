import { VTU_STYLE } from "./coverPresets";

export function createEmptyReport() {
  return {
    cover: {
      ...structuredClone(VTU_STYLE),
      students: [
        { name: "Student Name 1", usn: "USN" },
        { name: "Student Name 2", usn: "USN" },
      ],
      images: {},
    },
    prelims: { acknowledgement: null, abstract: null },
    sections: [],
    references: [],
    style: { fontFamily: "Times New Roman", headingSize: 14, bodySize: 12, lineSpacing: 1.5 },
  };
}