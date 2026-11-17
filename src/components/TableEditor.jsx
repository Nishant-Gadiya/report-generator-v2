export default function TableEditor({ rows, onChange }) {
  const setCell = (r, c, value) =>
    onChange(rows.map((row, ri) => (ri === r ? row.map((cell, ci) => (ci === c ? value : cell)) : row)));
  const addRow = () => onChange([...rows, Array(rows[0].length).fill("")]);
  const removeRow = () => rows.length > 1 && onChange(rows.slice(0, -1));
  const addCol = () => onChange(rows.map((row) => [...row, ""]));
  const removeCol = () => rows[0].length > 1 && onChange(rows.map((row) => row.slice(0, -1)));

  return (
    <div>
      <table className="table-edit">
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c}>
                  <input
                    value={cell}
                    placeholder={r === 0 ? "Heading" : ""}
                    onChange={(e) => setCell(r, c, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addRow}>+ Row</button>
      <button type="button" onClick={removeRow}>− Row</button>
      <button type="button" onClick={addCol}>+ Column</button>
      <button type="button" onClick={removeCol}>− Column</button>
      <p className="hint">The first row is the table heading.</p>
    </div>
  );
}