import ImageUpload from "./ImageUpload";
import TableEditor from "./TableEditor";

export default function BlockEditor({ block, onChange }) {
  if (block.type === "text") {
    return (
      <textarea
        rows={5}
        placeholder="Write your paragraph. Leave a blank line to start a new paragraph."
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
      />
    );
  }

  if (block.type === "image") {
    return (
      <div>
        <ImageUpload
          label="Image"
          value={block.src}
          maxWidth={800}
          onChange={(src) => onChange({ src })}
        />
        <input
          placeholder="Caption, e.g. System architecture"
          value={block.caption}
          onChange={(e) => onChange({ caption: e.target.value })}
        />
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div>
        <TableEditor rows={block.rows} onChange={(rows) => onChange({ rows })} />
        <input
          placeholder="Caption, e.g. Test results"
          value={block.caption}
          onChange={(e) => onChange({ caption: e.target.value })}
        />
      </div>
    );
  }

  return null;
}