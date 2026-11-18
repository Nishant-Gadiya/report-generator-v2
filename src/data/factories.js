export const newBlock = (type) => {
  const id = crypto.randomUUID();
  if (type === "text") return { id, type, content: "" };
  if (type === "image") return { id, type, src: null, caption: "" };
  if (type === "table") return { id, type, caption: "", rows: [["", ""], ["", ""]] };
};

export const newSection = () => ({
  id: crypto.randomUUID(), title: "", blocks: [], children: [], pageBreak: false,
});

export const newReference = () => ({ id: crypto.randomUUID(), text: "" });