import { renderCover } from "../render/renderCover";

export default function CoverPreview({ cover }) {
  return (
    <div className="page">
      <div dangerouslySetInnerHTML={{ __html: renderCover(cover) }} />
    </div>
  );
}