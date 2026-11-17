export function computeNumbers(sections) {
  const labels = {};
  sections.forEach((sec, i) => {
    const secNo = i + 1;
    labels[sec.id] = String(secNo);
    let fig = 0;
    let tab = 0;

    const numberBlocks = (blocks) => {
      blocks.forEach((b) => {
        if (b.type === "image") { fig++; labels[b.id] = `Fig. ${secNo}.${fig}`; }
        if (b.type === "table") { tab++; labels[b.id] = `Table ${secNo}.${tab}`; }
      });
    };

    numberBlocks(sec.blocks);
    sec.subsections.forEach((sub, j) => {
      labels[sub.id] = `${secNo}.${j + 1}`;
      numberBlocks(sub.blocks);
    });
  });
  return labels;
}