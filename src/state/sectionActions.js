import { newBlock, newSection, newSubsection } from "../data/factories";

// move an item up (-1) or down (+1) in a list
export function moveItem(list, index, dir) {
  const j = index + dir;
  if (j < 0 || j >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[j]] = [copy[j], copy[index]];
  return copy;
}

// find a section OR subsection by id and change it
function mapContainer(sections, id, fn) {
  return sections.map((s) => {
    const next = s.id === id ? fn(s) : s;
    return {
      ...next,
      subsections: next.subsections.map((sub) => (sub.id === id ? fn(sub) : sub)),
    };
  });
}

export const addSection = (sections) => [...sections, newSection()];

export const addSubsection = (sections, sectionId) =>
  mapContainer(sections, sectionId, (s) => ({
    ...s, subsections: [...s.subsections, newSubsection()],
  }));

export const updateContainer = (sections, id, patch) =>
  mapContainer(sections, id, (c) => ({ ...c, ...patch }));

export const removeContainer = (sections, id) =>
  sections
    .filter((s) => s.id !== id)
    .map((s) => ({ ...s, subsections: s.subsections.filter((sub) => sub.id !== id) }));

export const moveSection = (sections, index, dir) => moveItem(sections, index, dir);

export const moveSubsection = (sections, sectionId, index, dir) =>
  mapContainer(sections, sectionId, (s) => ({
    ...s, subsections: moveItem(s.subsections, index, dir),
  }));

export const addBlock = (sections, containerId, type, index) =>
  mapContainer(sections, containerId, (c) => {
    const blocks = [...c.blocks];
    blocks.splice(index, 0, newBlock(type)); // insert at that position
    return { ...c, blocks };
  });

export const updateBlock = (sections, containerId, blockId, patch) =>
  mapContainer(sections, containerId, (c) => ({
    ...c, blocks: c.blocks.map((b) => (b.id === blockId ? { ...b, ...patch } : b)),
  }));

export const removeBlock = (sections, containerId, blockId) =>
  mapContainer(sections, containerId, (c) => ({
    ...c, blocks: c.blocks.filter((b) => b.id !== blockId),
  }));

export const moveBlock = (sections, containerId, index, dir) =>
  mapContainer(sections, containerId, (c) => ({
    ...c, blocks: moveItem(c.blocks, index, dir),
  }));