export function toRoman(n) {
  const map = [
    [1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"],
    [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let out = "";
  for (const [value, symbol] of map) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
}

// runs after Paged.js has built the pages
export function numberPages(root) {
  const labels = new Map();
  let front = 0;
  let main = 0;

  root.querySelectorAll(".pagedjs_page").forEach((page) => {
    let label = null;
    if (page.classList.contains("pagedjs_prelims_page")) label = toRoman(++front);
    else if (page.classList.contains("pagedjs_main_page")) label = String(++main);

    if (label) {
      page.style.setProperty("--page-label", `"${label}"`);
      labels.set(page, label);
    }
  });

  // fill in the table of contents numbers
  root.querySelectorAll(".toc-page[data-target]").forEach((span) => {
    const target = root.querySelector(`#${CSS.escape(span.dataset.target)}`);
    const page = target ? target.closest(".pagedjs_page") : null;
    span.textContent = (page && labels.get(page)) || "";
  });
}