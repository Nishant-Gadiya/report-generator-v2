import { useEffect, useRef, useState } from "react";
import { Previewer } from "pagedjs";
import { buildDocument } from "../render/buildDocument";
import { buildPagedCss } from "../render/buildPagedCss";

export default function PagedView({ report, onBack }) {
  const holder = useRef(null);
  const started = useRef(false);
  const [status, setStatus] = useState("Building pages…");

  useEffect(() => {
    // React runs effects twice in development; this makes sure we build only once
    if (started.current) return;
    started.current = true;

    const template = document.createElement("template");
    template.innerHTML = buildDocument(report);

    new Previewer()
      .preview(template.content, [{ "report.css": buildPagedCss(report) }], holder.current)
      .then((flow) => setStatus(`${flow.total} pages ready`))
      .catch((err) => {
        console.error(err);
        setStatus("Could not build the pages. Check the Console (F12).");
      });

    return () => {
      // clean up the styles Paged.js added when we leave this screen
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