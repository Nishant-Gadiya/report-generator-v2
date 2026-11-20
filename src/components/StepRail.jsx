import { LayoutTemplate, FileText, AlignLeft, Library, Palette } from "lucide-react";

const ICONS = {
  cover: LayoutTemplate,
  front: FileText,
  content: AlignLeft,
  refs: Library,
  design: Palette,
};

export default function StepRail({ steps, current, onSelect, badges }) {
  return (
    <nav className="rail">
      <ol className="rail-steps">
        {steps.map((s) => {
          const Icon = ICONS[s.id];
          return (
            <li key={s.id}>
              <button
                type="button"
                className={current === s.id ? "active" : ""}
                onClick={() => onSelect(s.id)}
                title={s.label}
              >
                <span className="rail-icon">
                  <Icon size={16} />
                </span>
                <span className="rail-label">{s.label}</span>
                {badges[s.id] ? <span className="rail-badge">{badges[s.id]}</span> : null}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="rail-tip">Tip: save a project file now and then as a backup.</p>
    </nav>
  );
}