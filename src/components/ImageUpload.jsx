import { fileToDataUrl } from "../lib/images";

export default function ImageUpload({ label, value, onChange }) {
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    try {
      onChange(await fileToDataUrl(file));
    } catch {
      alert("Could not read that image. Try a different file.");
    }
    e.target.value = ""; // lets the user pick the same file again later
  }

  return (
    <div>
      <label>{label}</label>
      <input type="file" accept="image/png,image/jpeg" onChange={handleFile} />
      {value && (
        <>
          <img src={value} alt="" style={{ height: 40, marginLeft: 8 }} />
          <button type="button" onClick={() => onChange(null)}>Remove</button>
        </>
      )}
    </div>
  );
}