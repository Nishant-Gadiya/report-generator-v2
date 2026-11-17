export default function PrelimsEditor({ prelims, setReport }) {
  const update = (key, patch) =>
    setReport((r) => ({
      ...r,
      prelims: { ...r.prelims, [key]: { ...r.prelims[key], ...patch } },
    }));

  const { acknowledgement, abstract } = prelims;

  return (
    <div>
      <div className="prelim-card">
        <label className="prelim-toggle">
          <input
            type="checkbox"
            checked={acknowledgement.on}
            onChange={(e) => update("acknowledgement", { on: e.target.checked })}
          />
          Include Acknowledgement
        </label>
        {acknowledgement.on && (
          <textarea
            rows={8}
            placeholder="Write your acknowledgement. Leave a blank line to start a new paragraph."
            value={acknowledgement.text}
            onChange={(e) => update("acknowledgement", { text: e.target.value })}
          />
        )}
      </div>

      <div className="prelim-card">
        <label className="prelim-toggle">
          <input
            type="checkbox"
            checked={abstract.on}
            onChange={(e) => update("abstract", { on: e.target.checked })}
          />
          Include Abstract
        </label>
        {abstract.on && (
          <>
            <textarea
              rows={8}
              placeholder="Write your abstract."
              value={abstract.text}
              onChange={(e) => update("abstract", { text: e.target.value })}
            />
            <input
              placeholder="Keywords (optional), separated by commas"
              value={abstract.keywords}
              onChange={(e) => update("abstract", { keywords: e.target.value })}
            />
          </>
        )}
      </div>
    </div>
  );
}