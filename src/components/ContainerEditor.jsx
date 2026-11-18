import AddBlockBar from "./AddBlockBar";
import BlockEditor from "./BlockEditor";
import {
  updateContainer, addBlock, updateBlock, removeBlock, moveBlock,
  addChild, removeContainer, moveContainer,
} from "../state/sectionActions";

const MAX_DEPTH = 4;

export default function ContainerEditor({ container, labels, change, depth = 1 }) {
  const id = container.id;
  const name = depth === 1 ? "Section" : "Subsection";
  const addSub = depth < MAX_DEPTH ? () => change((s) => addChild(s, id)) : undefined;
  const lastIndex = container.blocks.length - 1;

  const askDelete = () => {
    if (window.confirm(`Delete this ${name.toLowerCase()} and everything inside it?`)) {
      change((s) => removeContainer(s, id));
    }
  };

  return (
    <div className={depth === 1 ? "section-card" : "subsection-card"}>
      <div className="card-head">
        <strong>{name} {labels[id]}</strong>
        <span>
          <button type="button" onClick={() => change((s) => moveContainer(s, id, -1))}>↑</button>
          <button type="button" onClick={() => change((s) => moveContainer(s, id, 1))}>↓</button>
          <button type="button" onClick={askDelete}>Delete</button>
        </span>
      </div>

      <input
        className="title-input"
        placeholder="Title"
        value={container.title}
        onChange={(e) => change((s) => updateContainer(s, id, { title: e.target.value }))}
      />

      <label className="break-toggle">
  <input
    type="checkbox"
    checked={!!container.pageBreak}
    onChange={(e) =>
      change((s) => updateContainer(s, id, { pageBreak: e.target.checked }))
    }
  />
  Start on a new page
</label>

      <AddBlockBar
        onAdd={(type) => change((s) => addBlock(s, id, type, 0))}
        onAddSub={container.blocks.length === 0 ? addSub : undefined}
      />

      {container.blocks.map((block, i) => (
        <div key={block.id} className="block-box">
          <div className="block-head">
            <span>{labels[block.id] ?? "Text"}</span>
            <span>
              <button type="button" onClick={() => change((s) => moveBlock(s, id, i, -1))}>↑</button>
              <button type="button" onClick={() => change((s) => moveBlock(s, id, i, 1))}>↓</button>
              <button type="button" onClick={() => change((s) => removeBlock(s, id, block.id))}>✕</button>
            </span>
          </div>

          <BlockEditor
            block={block}
            onChange={(patch) => change((s) => updateBlock(s, id, block.id, patch))}
          />

          <AddBlockBar
            onAdd={(type) => change((s) => addBlock(s, id, type, i + 1))}
            onAddSub={i === lastIndex ? addSub : undefined}
          />
        </div>
      ))}

      {container.children.map((child) => (
        <ContainerEditor
          key={child.id}
          container={child}
          labels={labels}
          change={change}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}