import { newReference } from "../data/factories";
import { moveItem } from "../state/sectionActions";

export default function ReferencesEditor({ references, setReport }) {
  const change = (fn) => setReport((r) => ({ ...r, references: fn(r.references) }));

  const update = (id, text) =>
    change((list) => list.map((ref) => (ref.id === id ? { ...ref, text } : ref)));
  const remove = (id) => change((list) => list.filter((ref) => ref.id !== id));
  const add = () => change((list) => [...list, newReference()]);
  const move = (index, dir) => change((list) => moveItem(list, index, dir));

  return (
    <div>
      {references.length === 0 && (
        <p className="hint">No references yet. Add your first one below.</p>
      )}

      {references.map((ref, i) => (
        <div key={ref.id} className="block-box">
          <div className="block-head">
            <span>[{i + 1}]</span>
            <span>
              <button type="button" onClick={() => move(i, -1)}>↑</button>
              <button type="button" onClick={() => move(i, 1)}>↓</button>
              <button type="button" onClick={() => remove(ref.id)}>✕</button>
            </span>
          </div>
          <textarea
            rows={3}
            placeholder='e.g. A. Kumar, "Retrieval-Augmented Generation," Journal of AI, vol. 5, 2024.'
            value={ref.text}
            onChange={(e) => update(ref.id, e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={add}>+ Add reference</button>
      <p className="hint">Numbers like [1], [2] are added automatically. Type only the reference itself.</p>
    </div>
  );
}