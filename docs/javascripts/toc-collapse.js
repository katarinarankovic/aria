function initTocCollapse() {
  const tocNav =
    document.querySelector('nav[aria-label="Table of contents"]') ||
    document.querySelector(".md-nav--secondary");

  if (!tocNav) return;

  // Prevent repeated binding under navigation.instant
  if (tocNav.dataset.tocCollapseInitialized === "true") return;
  tocNav.dataset.tocCollapseInitialized = "true";

  const items = Array.from(tocNav.querySelectorAll("li"));
  if (items.length === 0) return;

  // Helper: get "level" of a TOC item (Material often uses data-md-level)
  function getLevel(li) {
    const attr = li.getAttribute("data-md-level");
    if (attr) {
      const n = parseInt(attr, 10);
      if (!Number.isNaN(n)) return n;
    }

    // Fallback: try aria-level on the link (rare)
    const a = li.querySelector("a");
    const aria = a && a.getAttribute("aria-level");
    if (aria) {
      const n = parseInt(aria, 10);
      if (!Number.isNaN(n)) return n;
    }

    // Last-resort fallback: treat everything as same level
    return 0;
  }

  const levels = items.map(getLevel);
  const baseLevel = Math.min(...levels);

  // We want to collapse at "H3" (i.e., keep top + one level visible)
  // So: children deeper than (baseLevel + 1) get hidden initially.
  const collapseFromLevel = baseLevel + 2;

  // Build parent->children groups in the FLAT list.
  // A parent is any item at level (collapseFromLevel - 1) or higher-level heading,
  // and its "children" are the subsequent items with level >= collapseFromLevel
  // until we reach an item with level <= parentLevel.
  const groups = [];

  for (let i = 0; i < items.length; i++) {
    const li = items[i];
    const L = getLevel(li);

    // Parent candidates are levels <= collapseFromLevel - 1
    // (i.e., keep these visible)
    if (L <= collapseFromLevel - 1) {
      const children = [];
      let j = i + 1;

      while (j < items.length) {
        const next = items[j];
        const Ln = getLevel(next);

        if (Ln <= L) break; // next sibling or higher section starts
        if (Ln >= collapseFromLevel) children.push(next);
        j++;
      }

      if (children.length > 0) {
        groups.push({ parent: li, parentLevel: L, children });
      }
    }
  }

  // If we couldn't detect levels (all zeros), do nothing.
  // (This avoids hiding everything accidentally.)
  const allSameLevel = levels.every((x) => x === levels[0]);
  if (allSameLevel) return;

  // Collapse all groups by default
  groups.forEach(({ parent, children }) => {
    parent.setAttribute("data-has-children", "true");
    parent.setAttribute("data-collapsed", "true");
    children.forEach((c) => (c.style.display = "none"));

    const link = parent.querySelector("a");
    if (!link) return;

    link.addEventListener("click", () => {
      const collapsed = parent.getAttribute("data-collapsed") === "true";
      parent.setAttribute("data-collapsed", collapsed ? "false" : "true");
      children.forEach((c) => (c.style.display = collapsed ? "" : "none"));
    });
  });

  // Expand the group that contains the current hash so readers can see context
  const hash = decodeURIComponent(window.location.hash || "");
  if (hash) {
    const active = tocNav.querySelector(`a[href="${hash}"]`);
    if (active) {
      const activeLi = active.closest("li");
      if (activeLi) {
        groups.forEach(({ parent, children }) => {
          if (children.includes(activeLi)) {
            parent.setAttribute("data-collapsed", "false");
            children.forEach((c) => (c.style.display = ""));
          }
        });
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initTocCollapse);

// Material instant navigation support
if (typeof document$ !== "undefined") {
  document$.subscribe(() => setTimeout(initTocCollapse, 0));
}    li.setAttribute("data-has-children", "true");

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
