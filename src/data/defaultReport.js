export function createEmptyReport() {
  return {
    cover: { template: "default", fields: { title: "", students: [], guide: "" } },
    prelims: { acknowledgement: null, abstract: null }, // null = not included
    sections: [],
    references: [],
    style: {
      fontFamily: "Times New Roman",
      headingSize: 14,
      bodySize: 12,
      lineSpacing: 1.5,
    },
  };
}