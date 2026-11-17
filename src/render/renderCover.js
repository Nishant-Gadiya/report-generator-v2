const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const colorOf = (slot, cover) =>
  slot.color === "accent" ? cover.accent : slot.color === "text" ? "#000" : slot.color;

function renderStudents(slot, cover) {
  const rows = cover.students
    .map(
      (s) => `<div class="student-row">
        <span>${esc(s.name)}</span>
        ${slot.showUsn ? `<span>${esc(s.usn)}</span>` : ""}
      </div>`
    )
    .join("");
  return `<div class="students" style="font-size:${slot.size}pt;font-weight:${slot.bold ? 700 : 400};color:${colorOf(slot, cover)}">${rows}</div>`;
}

function renderSlot(slot, cover) {
  if (!slot.on) return "";
  if (slot.type === "image") {
    const src = cover.images?.[slot.id];
    return src ? `<img src="${src}" style="width:${slot.width}px;align-self:center">` : "";
  }
  if (slot.type === "students") return renderStudents(slot, cover);

  const text = esc(slot.text).replace(/\n/g, "<br>");
  const shown = slot.quotes ? `“${text}”` : text;
  return `<div style="font-size:${slot.size}pt;font-weight:${slot.bold ? 700 : 400};color:${colorOf(slot, cover)}">${shown}</div>`;
}

export function renderCover(cover) {
  const zone = (name) =>
    `<div class="cover-zone zone-${name}">${cover.zones[name].map((s) => renderSlot(s, cover)).join("")}</div>`;
  const borderClass = !cover.border || cover.border === "none" ? "" : `cover-${cover.border}`;
  return `<section class="cover ${borderClass}">${zone("top")}${zone("middle")}${zone("bottom")}</section>`;
}