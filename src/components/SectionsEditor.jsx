import ContainerEditor from "./ContainerEditor";
import { computeNumbers } from "../lib/computeNumbers";
import { addSection } from "../state/sectionActions";

export default function SectionsEditor({ sections, setReport }) {
  const labels = computeNumbers(sections);
  const change = (fn) => setReport((r) => ({ ...r, sections: fn(r.sections) }));

  return (
    <div>
      {sections.length === 0 && (
        <p className="hint">No sections yet. Add your first one below.</p>
      )}

      {sections.map((sec) => (
        <ContainerEditor key={sec.id} container={sec} labels={labels} change={change} />
      ))}

      <button type="button" className="add-section" onClick={() => change(addSection)}>
        + Add section
      </button>
    </div>
  );
}