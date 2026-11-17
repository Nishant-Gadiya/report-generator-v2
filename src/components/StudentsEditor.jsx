export default function StudentsEditor({ students, onChange }) {
  const update = (id, patch) =>
    onChange(students.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const remove = (id) => onChange(students.filter((s) => s.id !== id));
  const add = () =>
    onChange([...students, { id: crypto.randomUUID(), name: "", usn: "" }]);

  return (
    <div className="students-editor">
      {students.map((s) => (
        <div key={s.id} className="student-edit-row">
          <input
            placeholder="Name"
            value={s.name}
            onChange={(e) => update(s.id, { name: e.target.value })}
          />
          <input
            placeholder="USN"
            value={s.usn}
            onChange={(e) => update(s.id, { usn: e.target.value })}
          />
          <button type="button" onClick={() => remove(s.id)}>✕</button>
        </div>
      ))}
      <button type="button" onClick={add}>+ Add student</button>
    </div>
  );
}