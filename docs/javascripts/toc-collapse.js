function initTocCollapse() {
  const tocNav =
    document.querySelector('nav[aria-label="Table of contents"]') ||
    document.querySelector(".md-nav--secondary");

  if (!tocNav) return;

  // Avoid double-initializing (Material instant navigation runs this repeatedly)
  if (tocNav.dataset.tocCollapseInitialized === "true") return;
  tocNav.dataset.tocCollapseInitialized = "true";

  // Helper: get direct child NAV of an LI (Safari-safe, no :scope)
  function directChildNav(li) {
    for (const child of li.children) {
      if (child.tagName === "NAV") return child;
    }
    return null;
  }

  // Depth: count how many ancestor <li> exist inside this TOC nav
  function liDepth(li) {
    let d = 0;
    let p = li.parentElement;
    while (p && p !== tocNav) {
      if (p.tagName === "LI") d += 1;
      p = p.parentElement;
    }
    return d; // 0 = top, 1 = next, etc.
  }

  const liNodes = Array.from(tocNav.querySelectorAll("li"));

  liNodes.forEach((li) => {
    const childNav = directChildNav(li);
    if (!childNav) return; // no children -> nothing to collapse

    li.setAttribute("data-has-children", "true");

    const depth = liDepth(li);

    // Collapse from depth >= 1 (roughly H3+ in most TOCs)
    // If this is too aggressive, change 1 -> 2 (roughly H4+)
    if (depth >= 1) {
      li.setAttribute("data-collapsed", "true");
      childNav.style.display = "none";
    } else {
      li.setAttribute("data-collapsed", "false");
    }

    // Toggle on click
    const link = li.querySelector("a");
    if (!link) return;

    link.addEventListener("click", () => {
      // only toggle at deeper levels
      if (depth < 1) return;

      const isCollapsed = li.getAttribute("data-collapsed") === "true";
      li.setAttribute("data-collapsed", isCollapsed ? "false" : "true");
      childNav.style.display = isCollapsed ? "" : "none";
    });
  });

  // Expand the path to the current hash (so you can see where you are)
  const hash = decodeURIComponent(window.location.hash || "");
  if (hash) {
    const active = tocNav.querySelector(`a[href="${hash}"]`);
    if (active) {
      let li = active.closest("li");
      while (li && tocNav.contains(li)) {
        const childNav = directChildNav(li);
        if (childNav) {
          li.setAttribute("data-collapsed", "false");
          childNav.style.display = "";
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
