import { esc } from "../lib/escape";

function renderBlock(block, labels) {
  if (block.type === "text") {
    return esc(block.content)
      .split(/\n\s*\n/)
      .filter((p) => p.trim())
      .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");
  }

  if (block.type === "image") {
    if (!block.src) return "";
    const cap = block.caption ? `: ${esc(block.caption)}` : "";
    return `<figure><img src="${block.src}" alt=""><figcaption>${labels[block.id]}${cap}</figcaption></figure>`;
  }

  if (block.type === "table") {
    const cap = block.caption ? `: ${esc(block.caption)}` : "";
    const rows = block.rows
      .map((row, r) =>
        `<tr>${row.map((cell) => (r === 0 ? `<th>${esc(cell)}</th>` : `<td>${esc(cell)}</td>`)).join("")}</tr>`
      )
      .join("");
    return `<div class="table-wrap"><div class="table-caption">${labels[block.id]}${cap}</div><table>${rows}</table></div>`;
  }

  return "";
}

function renderContainer(node, labels, depth) {
  const level = Math.min(depth + 1, 6); // section = h2, subsection = h3, next = h4...
  const label = depth === 1 ? `${labels[node.id]}.` : labels[node.id];
  const blocks = node.blocks.map((b) => renderBlock(b, labels)).join("");
  const kids = node.children.map((c) => renderContainer(c, labels, depth + 1)).join("");
 const kind = depth === 1 ? "report-section" : "report-sub";
return `<div class="${kind}${node.pageBreak ? " break-page" : ""}">
    <h${level} id="sec-${node.id}">${label} ${esc(node.title)}</h${level}>${blocks}${kids}
  </div>`;
}

export function renderSections(sections, labels) {
  return sections.map((s) => renderContainer(s, labels, 1)).join("");
}