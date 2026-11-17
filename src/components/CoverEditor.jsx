import SlotRow from "./SlotRow";
import StudentsEditor from "./StudentsEditor";
import ImageUpload from "./ImageUpload";

const ZONE_LABELS = { top: "Top", middle: "Middle", bottom: "Bottom" };

export default function CoverEditor({ cover, setReport }) {
  const updateCover = (patch) =>
    setReport((r) => ({ ...r, cover: { ...r.cover, ...patch } }));

  const updateSlot = (zone, id, patch) =>
    setReport((r) => ({
      ...r,
      cover: {
        ...r.cover,
        zones: {
          ...r.cover.zones,
          [zone]: r.cover.zones[zone].map((s) => (s.id === id ? { ...s, ...patch } : s)),
        },
      },
    }));

  const setImage = (id, dataUrl) =>
    setReport((r) => {
      const images = { ...r.cover.images };
      if (dataUrl) images[id] = dataUrl;
      else delete images[id];
      return { ...r, cover: { ...r.cover, images } };
    });

  return (
    <div className="cover-editor">
      <div className="editor-top">
        <label>
          Border{" "}
          <select value={cover.border} onChange={(e) => updateCover({ border: e.target.value })}>
            <option value="none">None</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>
        </label>
        <label>
          Accent color{" "}
          <input
            type="color"
            value={cover.accent}
            onChange={(e) => updateCover({ accent: e.target.value })}
          />
        </label>
      </div>

      {Object.keys(ZONE_LABELS).map((zone) => (
        <section key={zone}>
          <h3>{ZONE_LABELS[zone]}</h3>
          {cover.zones[zone].map((slot) => (
            <SlotRow
              key={slot.id}
              slot={slot}
              onChange={(patch) => updateSlot(zone, slot.id, patch)}
            >
              {slot.type === "image" ? (
                <ImageUpload
                  label="Logo"
                  value={cover.images[slot.id]}
                  onChange={(url) => setImage(slot.id, url)}
                />
              ) : slot.type === "students" ? (
                <StudentsEditor
                  students={cover.students}
                  onChange={(students) => updateCover({ students })}
                />
              ) : (
                <textarea
                  rows={slot.text.includes("\n") ? 3 : 1}
                  value={slot.text}
                  onChange={(e) => updateSlot(zone, slot.id, { text: e.target.value })}
                />
              )}
            </SlotRow>
          ))}
        </section>
      ))}
    </div>
  );
}