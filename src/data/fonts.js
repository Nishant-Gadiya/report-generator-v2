export const FONTS = [
  { id: "times", label: "Times New Roman", family: "Tinos", stack: "Tinos, 'Times New Roman', Times, serif" },
  { id: "arial", label: "Arial", family: "Arimo", stack: "Arimo, Arial, Helvetica, sans-serif" },
  { id: "calibri", label: "Calibri", family: "Carlito", stack: "Carlito, Calibri, sans-serif" },
  { id: "cambria", label: "Cambria", family: "Caladea", stack: "Cambria, Caladea, Georgia, serif" },
];

export const fontOf = (id) => FONTS.find((f) => f.id === id) ?? FONTS[0];