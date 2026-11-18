import { esc } from "../lib/escape";

export function renderToc(sections, labels, hasReferences) {
  const items = [];

  const walk = (nodes, depth) =>
    nodes.forEach((n) => {
      const dot = depth === 1 ? "." : "";
      items.push(
        `<li class="toc-d${depth}"><a href="#sec-${n.id}"><span>${labels[n.id]}${dot} ${esc(n.title)}</span></a></li>`
      );
      walk(n.children, depth + 1);
    });

  walk(sections, 1);

  if (hasReferences) {
    items.push(`<li class="toc-d1"><a href="#references-heading"><span>REFERENCES</span></a></li>`);
  }
  if (items.length === 0) return "";

  return `<div class="toc-page"><h2 class="prelim-title">TABLE OF CONTENTS</h2><ul class="toc">${items.join("")}</ul></div>`;
}