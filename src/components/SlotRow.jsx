const SIZES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 32, 36];

export default function SlotRow({ slot, onChange, compact, children }) {
  if (compact) {
    return (
      <div className="slot-row slot-compact">
        <div className="slot-main">{children}</div>
      </div>
    );
  }

  const colorMode = ["accent", "text"].includes(slot.color) ? slot.color : "custom";

  return (
    <div className="slot-row">
      <label className="slot-on">
        <input
          type="checkbox"
          checked={slot.on}
          onChange={(e) => onChange({ on: e.target.checked })}
        />
      </label>

      <div className="slot-main">{children}</div>

      {slot.type !== "image" && (
        <div className="slot-style">
          <select
            value={slot.size}
            onChange={(e) => onChange({ size: Number(e.target.value) })}
            title="Font size"
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button
            type="button"
            className={slot.bold ? "btn-bold active" : "btn-bold"}
            onClick={() => onChange({ bold: !slot.bold })}
            title="Bold"
          >
            B
          </button>

          <select
            value={colorMode}
            onChange={(e) =>
              onChange({ color: e.target.value === "custom" ? "#000000" : e.target.value })
            }
            title="Color"
          >
            <option value="accent">Accent</option>
            <option value="text">Black</option>
            <option value="custom">Custom</option>
          </select>

          {colorMode === "custom" && (
            <input
              type="color"
              value={slot.color}
              onChange={(e) => onChange({ color: e.target.value })}
            />
          )}
        </div>
      )}
    </div>
  );
}