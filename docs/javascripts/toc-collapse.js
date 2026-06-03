function initTocCollapse() {
  const tocNav =
    document.querySelector('nav[aria-label="Table of contents"]') ||
    document.querySelector(".md-nav--secondary") ||
    document.querySelector(".md-nav__item--toc");

  if (!tocNav) return;

  const items = tocNav.querySelectorAll("li");

  function depthOf(li) {
    let depth = 0;
    let p = li.parentElement;
    while (p && p !== tocNav) {
      if (p.tagName === "UL") depth += 1;
      p = p.parentElement;
    }
    return Math.max(0, depth - 1);
    console.log("TOC collapse script ran");
  }

  items.forEach((li) => {
    const childUl = li.querySelector(":scope > ul");
    if (!childUl) return;

    li.classList.add("has-children");

    const depth = depthOf(li);
    if (depth >= 1) li.classList.add("is-collapsed"); // collapse H3+
  });

  const hash = decodeURIComponent(window.location.hash || "");
  if (hash) {
    const active = tocNav.querySelector(`a[href="${hash}"]`);
    if (active) {
      let li = active.closest("li");
      while (li && tocNav.contains(li)) {
        li.classList.remove("is-collapsed");
        li.classList.add("is-expanded");
        li = li.parentElement?.closest("li");
      }
    }
  }

  tocNav.querySelectorAll("li.has-children > a").forEach((a) => {
    a.addEventListener("click", () => {
      const li = a.closest("li");
      if (!li) return;
      const depth = depthOf(li);
      if (depth < 1) return; // don't toggle top level
      li.classList.toggle("is-collapsed");
      li.classList.toggle("is-expanded");
    });
  });
}

document.addEventListener("DOMContentLoaded", initTocCollapse);

if (typeof document$ !== "undefined") {
  document$.subscribe(() => setTimeout(initTocCollapse, 0));
}
