import { useState } from "react";
import SlotRow from "./SlotRow";
import StudentsEditor from "./StudentsEditor";
import ImageUpload from "./ImageUpload";
import Segmented from "./Segmented";
import { FONTS } from "../data/fonts";
import { COVER_PRESETS } from "../data/coverPresets";

const ZONE_LABELS = { top: "Top", middle: "Middle", bottom: "Bottom" };

export default function CoverEditor({ cover, setReport }) {
  const [custom, setCustom] = useState(false);

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

  const resetCover = () => {
    if (!window.confirm("Reset the cover design and wording to the starting version? Your students and logos stay.")) return;
    const preset = COVER_PRESETS[cover.presetId] ?? COVER_PRESETS.vtu;
    setReport((r) => ({
      ...r,
      cover: { ...structuredClone(preset), students: r.cover.students, images: r.cover.images },
    }));
  };

  return (
    <div className="cover-editor">
      <label className="custom-toggle">
        <input type="checkbox" checked={custom} onChange={(e) => setCustom(e.target.checked)} />
        Customize layout and style
      </label>
      {!custom && (
        <p className="hint">
          Edit the text below. Turn on “Customize” to change fonts, sizes, colors, or to hide and
          show lines.
        </p>
      )}

      {custom && (
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
            Font{" "}
            <select value={cover.font} onChange={(e) => updateCover({ font: e.target.value })}>
              {FONTS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
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
          <button type="button" onClick={resetCover}>Reset cover</button>
        </div>
      )}

      {Object.keys(ZONE_LABELS).map((zone) => {
        const slots = cover.zones[zone].filter((s) => custom || s.on);
        if (slots.length === 0) return null;

        return (
          <section key={zone}>
            {custom && <h3>{ZONE_LABELS[zone]}</h3>}
            {slots.map((slot) => (
              <SlotRow
                key={slot.id}
                slot={slot}
                compact={!custom}
                onChange={(patch) => updateSlot(zone, slot.id, patch)}
              >
                {slot.type === "image" ? (
                  <ImageUpload
                    label="Logo"
                    value={cover.images[slot.id]}
                    onChange={(url) => setImage(slot.id, url)}
                  />
                ) : slot.type === "students" ? (
                  <div>
                    {custom && (
                      <>
                        <div className="field-row">
                          <Segmented
                            value={slot.layout ?? "plain"}
                            options={[
                              { value: "plain", label: "List" },
                              { value: "table", label: "Table" },
                            ]}
                            onChange={(layout) => updateSlot(zone, slot.id, { layout })}
                          />
                          <label>
                            <input
                              type="checkbox"
                              checked={slot.showUsn}
                              onChange={(e) => updateSlot(zone, slot.id, { showUsn: e.target.checked })}
                            />{" "}
                            USN column
                          </label>
                        </div>

                        {slot.layout === "table" && (
                          <div className="field-row">
                            <input
                              placeholder="Name column title"
                              value={slot.nameHeading ?? "Name"}
                              onChange={(e) => updateSlot(zone, slot.id, { nameHeading: e.target.value })}
                            />
                            {slot.showUsn && (
                              <input
                                placeholder="USN column title"
                                value={slot.usnHeading ?? "USN"}
                                onChange={(e) => updateSlot(zone, slot.id, { usnHeading: e.target.value })}
                              />
                            )}
                            <label>
                              <input
                                type="checkbox"
                                checked={slot.tableBorders}
                                onChange={(e) => updateSlot(zone, slot.id, { tableBorders: e.target.checked })}
                              />{" "}
                              Borders
                            </label>
                          </div>
                        )}
                      </>
                    )}

                    <StudentsEditor
                      students={cover.students}
                      onChange={(students) => updateCover({ students })}
                    />
                  </div>
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
        );
      })}
    </div>
  );
}