import { useEffect, useRef, useState } from "react";
import { Previewer } from "pagedjs";
import { buildDocument } from "../render/buildDocument";
import { buildPagedCss } from "../render/buildPagedCss";
import { fontOf } from "../data/fonts";

export default function PagedView({ report, onBack }) {
  const holder = useRef(null);
  const started = useRef(false);
  const [status, setStatus] = useState("Building pages…");

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    async function run() {
      try {
        const families = [fontOf(report.style.fontId).family, fontOf(report.cover.font).family];
        await Promise.all(
          families.flatMap((f) => [
            document.fonts.load(`12pt ${f}`),
            document.fonts.load(`bold 12pt ${f}`),
          ])
        );

        const template = document.createElement("template");
        template.innerHTML = buildDocument(report);

        const flow = await new Previewer().preview(
          template.content,
          [{ "report.css": buildPagedCss(report) }],
          holder.current
        );
        setStatus(`${flow.total} pages ready`);
      } catch (err) {
        console.error(err);
        setStatus("Could not build the pages. Check the Console (F12).");
      }
    }
    run();

    return () => {
      document
        .querySelectorAll("style[data-pagedjs-inserted-styles]")
        .forEach((el) => el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="paged-toolbar">
        <button onClick={onBack}>← Back to editor</button>
        <span>{status}</span>
        <button onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      <div className="paged-holder" ref={holder} />
    </div>
  );
}