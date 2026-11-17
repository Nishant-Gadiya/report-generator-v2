export default function AddBlockBar({ onAdd, onAddSub }) {
  return (
    <div className="add-bar">
      <button type="button" onClick={() => onAdd("text")}>+ Text</button>
      <button type="button" onClick={() => onAdd("image")}>+ Image</button>
      <button type="button" onClick={() => onAdd("table")}>+ Table</button>
      {onAddSub && (
        <button type="button" onClick={onAddSub}>+ Subsection</button>
      )}
    </div>
  );
}