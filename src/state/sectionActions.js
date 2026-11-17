import { newBlock, newSection } from "../data/factories";

export function moveItem(list, index, dir) {
  const j = index + dir;
  if (j < 0 || j >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[j]] = [copy[j], copy[index]];
  return copy;
}

// find the section/subsection with this id (at any depth) and change it
function mapTree(list, id, fn) {
  return list.map((n) =>
    n.id === id ? fn(n) : { ...n, children: mapTree(n.children, id, fn) }
  );
}

export const addSection = (sections) => [...sections, newSection()];

export const addChild = (sections, parentId) =>
  mapTree(sections, parentId, (n) => ({ ...n, children: [...n.children, newSection()] }));

export const updateContainer = (sections, id, patch) =>
  mapTree(sections, id, (n) => ({ ...n, ...patch }));

export const removeContainer = (list, id) =>
  list
    .filter((n) => n.id !== id)
    .map((n) => ({ ...n, children: removeContainer(n.children, id) }));

// move a section or subsection up (-1) or down (+1) among its neighbours
export function moveContainer(list, id, dir) {
  const index = list.findIndex((n) => n.id === id);
  if (index !== -1) return moveItem(list, index, dir);
  return list.map((n) => ({ ...n, children: moveContainer(n.children, id, dir) }));
}

export const addBlock = (sections, containerId, type, index) =>
  mapTree(sections, containerId, (c) => {
    const blocks = [...c.blocks];
    blocks.splice(index, 0, newBlock(type));
    return { ...c, blocks };
  });

export const updateBlock = (sections, containerId, blockId, patch) =>
  mapTree(sections, containerId, (c) => ({
    ...c, blocks: c.blocks.map((b) => (b.id === blockId ? { ...b, ...patch } : b)),
  }));

export const removeBlock = (sections, containerId, blockId) =>
  mapTree(sections, containerId, (c) => ({
    ...c, blocks: c.blocks.filter((b) => b.id !== blockId),
  }));

export const moveBlock = (sections, containerId, index, dir) =>
  mapTree(sections, containerId, (c) => ({
    ...c, blocks: moveItem(c.blocks, index, dir),
  }));