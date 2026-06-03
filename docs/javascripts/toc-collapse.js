function initTocCollapse() {
  const tocNav =
    document.querySelector('nav[aria-label="Table of contents"]') ||
    document.querySelector(".md-nav--secondary");

  if (!tocNav) return;

  // Find ALL list items inside the TOC
  const liNodes = Array.from(tocNav.querySelectorAll("li"));

  // Depth of an <li> based on how many <ul> ancestors it has within the TOC nav
  function depthOf(li) {
    let depth = 0;
    let p = li.parentElement;
    while (p && p !== tocNav) {
      if (p.tagName === "UL") depth += 1;
      p = p.parentElement;
    }
    // depth 1 = top level, depth 2 = next, etc.
    return depth;
  }

  liNodes.forEach((li) => {
    // Find the *direct* nested list under this item (if any)
    const childUl = li.querySelector(":scope > ul");
    if (!childUl) return;

    // Mark as having children (for arrows via CSS, optional)
    li.dataset.hasChildren = "true";

    // Collapse from depth >= 2 (roughly H3 and deeper)
    const depth = depthOf(li);
    if (depth >= 2) {
      li.dataset.collapsed = "true";
      childUl.style.display = "none";
    }

    // Toggle on click (but allow navigation)
    const link = li.querySelector(":scope > a");
    if (!link) return;

    link.addEventListener("click", () => {
      // only toggle deeper levels; keep top level stable
      if (depth < 2) return;

      const isCollapsed = li.dataset.collapsed === "true";
      li.dataset.collapsed = isCollapsed ? "false" : "true";
      childUl.style.display = isCollapsed ? "" : "none";
    });
  });

  // Expand the branch containing the current hash (so you can see where you are)
  const hash = decodeURIComponent(window.location.hash || "");
  if (hash) {
    const active = tocNav.querySelector(`a[href="${hash}"]`);
    if (active) {
      let li = active.closest("li");
      while (li && tocNav.contains(li)) {
        const childUl = li.querySelector(":scope > ul");
        if (childUl) {
          li.dataset.collapsed = "false";
          childUl.style.display = "";
        }
        li = li.parentElement?.closest("li");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initTocCollapse);

// Material instant navigation support
if (typeof document$ !== "undefined") {
  document$.subscribe(() => setTimeout(initTocCollapse, 0));
}
