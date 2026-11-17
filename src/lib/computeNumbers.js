export function computeNumbers(sections) {
  const labels = {};

  sections.forEach((sec, i) => {
    const secNo = i + 1;
    let fig = 0;
    let tab = 0;

    const walk = (node, label) => {
      labels[node.id] = label;

      node.blocks.forEach((b) => {
        if (b.type === "image") { fig++; labels[b.id] = `Fig. ${secNo}.${fig}`; }
        if (b.type === "table") { tab++; labels[b.id] = `Table ${secNo}.${tab}`; }
      });

      node.children.forEach((child, j) => walk(child, `${label}.${j + 1}`));
    };

    walk(sec, String(secNo));
  });

  return labels;
}