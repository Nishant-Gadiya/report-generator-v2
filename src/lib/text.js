import { esc } from "./escape";

// turns typed text into <p> paragraphs (blank line = new paragraph)
export function toParagraphs(text) {
  return esc(text)
    .split(/\n\s*\n/)
    .filter((p) => p.trim())
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}