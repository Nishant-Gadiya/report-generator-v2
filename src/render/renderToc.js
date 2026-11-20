import { esc } from "../lib/escape";

export function renderToc(sections, labels, hasReferences) {
  const items = [];

  const line = (cls, href, text) =>
    `<li class="${cls}"><a href="#${href}"><span>${text}</span><span class="toc-page" data-target="${href}"></span></a></li>`;

  const walk = (nodes, depth) =>
    nodes.forEach((n) => {
      const dot = depth === 1 ? "." : "";
      items.push(line(`toc-d${depth}`, `sec-${n.id}`, `${labels[n.id]}${dot} ${esc(n.title)}`));
      walk(n.children, depth + 1);
    });

  walk(sections, 1);

  if (hasReferences) items.push(line("toc-d1", "references-heading", "REFERENCES"));
  if (items.length === 0) return "";

  return `<div class="toc-page-wrap"><h2 class="prelim-title">TABLE OF CONTENTS</h2><ul class="toc">${items.join("")}</ul></div>`;
}