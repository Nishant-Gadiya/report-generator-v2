import { COVER_PRESETS } from "../data/coverPresets";

export function checkReport(report) {
  const issues = [];
  const { cover, prelims, sections } = report;
  const slots = Object.values(cover.zones).flat();

  // cover title
  const title = slots.find((s) => s.id === "title");
  const preset = COVER_PRESETS[cover.presetId] ?? COVER_PRESETS.vtu;
  const sample = Object.values(preset.zones).flat().find((s) => s.id === "title");
  if (title && title.on) {
    if (!title.text.trim()) {
      issues.push({ step: "cover", text: "The cover title is empty." });
    } else if (sample && title.text.trim() === sample.text.trim()) {
      issues.push({ step: "cover", text: "The cover title still shows the sample text." });
    }
  }

  // students
  const studentsSlot = slots.find((s) => s.type === "students");
  if (studentsSlot && studentsSlot.on) {
    const bad = cover.students.some(
      (s) =>
        !s.name.trim() ||
        /^student name \d+$/i.test(s.name.trim()) ||
        (studentsSlot.showUsn && (!s.usn.trim() || s.usn.trim() === "USN"))
    );
    if (bad) issues.push({ step: "cover", text: "A student name or USN is empty or still a sample." });
  }

  // front pages
  if (prelims.acknowledgement.on && !prelims.acknowledgement.text.trim()) {
    issues.push({ step: "front", text: "Acknowledgement is switched on but empty." });
  }
  if (prelims.abstract.on && !prelims.abstract.text.trim()) {
    issues.push({ step: "front", text: "Abstract is switched on but empty." });
  }

  // sections
  if (sections.length === 0) {
    issues.push({ step: "content", text: "No sections added yet." });
  } else {
    let emptyTitles = 0;
    let emptyImages = 0;
    const walk = (nodes) =>
      nodes.forEach((n) => {
        if (!n.title.trim()) emptyTitles++;
        n.blocks.forEach((b) => {
          if (b.type === "image" && !b.src) emptyImages++;
        });
        walk(n.children);
      });
    walk(sections);

    if (emptyTitles) issues.push({ step: "content", text: `${emptyTitles} section(s) have no title.` });
    if (emptyImages) issues.push({ step: "content", text: `${emptyImages} image block(s) have no picture.` });
  }

  return issues;
}