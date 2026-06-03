function initTocCollapse() {
  const tocNav =
    document.querySelector('nav[aria-label="Table of contents"]') ||
    document.querySelector(".md-nav--secondary");

  if (!tocNav) return;

  // Collect all li elements inside the TOC
  const liNodes = Array.from(tocNav.querySelectorAll("li"));

  // Depth: count how many UL ancestors exist between this LI and tocNav
  function depthOf(li) {
    let depth = 0;
    let p = li.parentElement;
    while (p && p !== tocNav) {
      if (p.tagName === "UL") depth += 1;
      p = p.parentElement;
    }
    // depth 1 = top level, depth 2 = next (H3-ish), etc.
    return depth;
  }

  // Find direct child UL without using :scope (Safari-safe)
  function directChildUl(li) {
    for (const child of li.children) {
      if (child.tagName === "UL") return child;
    }
    return null;
  }

  // Mark + collapse
  liNodes.forEach((li) => {
    const childUl = directChildUl(li);
    if (!childUl) return;

    li.setAttribute("data-has-children", "true");

    const depth = depthOf(li);

    // Collapse from depth >= 2 (roughly H3+)
    if (depth >= 2) {
      li.setAttribute("data-collapsed", "true");
      childUl.style.display = "none";
    } else {
      li.setAttribute("data-collapsed", "false");
    }

    // Toggle on click for deeper levels only
    const link = li.querySelector("a");
    if (!link) return;

    link.addEventListener("click", () => {
      if (depth < 2) return;

      const isCollapsed = li.getAttribute("data-collapsed") === "true";
      li.setAttribute("data-collapsed", isCollapsed ? "false" : "true");
      childUl.style.display = isCollapsed ? "" : "none";
    });
  });

  // Expand the branch containing the current hash
  const hash = decodeURIComponent(window.location.hash || "");
  if (hash) {
    const active = tocNav.querySelector(`a[href="${hash}"]`);
    if (active) {
      let li = active.closest("li");
      while (li && tocNav.contains(li)) {
        const childUl = directChildUl(li);
        if (childUl) {
          li.setAttribute("data-collapsed", "false");
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
