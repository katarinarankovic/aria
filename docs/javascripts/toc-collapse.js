// Collapse integrated TOC items at depth >= 2 (roughly H3 and deeper),
// while keeping higher levels visible.
// Works with Material's integrated TOC container `.md-nav__item--toc`.

document.addEventListener("DOMContentLoaded", () => {
  const tocRoot = document.querySelector(".md-nav__item--toc");
  if (!tocRoot) return;

  const currentHash = decodeURIComponent(window.location.hash || "");

  // Helper: compute depth of a TOC <li> relative to the TOC root list.
  // Depth 0 = top level (H2-ish), depth 1 = next (H3-ish), etc.
  function getDepth(li) {
    let depth = 0;
    let node = li.parentElement;
    while (node && node !== tocRoot) {
      if (node.classList && node.classList.contains("md-nav__list")) depth += 1;
      node = node.parentElement;
    }
    // Subtract 1 because we counted the top list as depth 1
    return Math.max(0, depth - 1);
  }

  const items = tocRoot.querySelectorAll("li.md-nav__item");

  items.forEach((li) => {
    const childList = li.querySelector(":scope > ul.md-nav__list");
    if (!childList) return;

    li.classList.add("has-children");

    const depth = getDepth(li);

    // Collapse only deeper levels (depth >= 1 ≈ H3 and below)
    if (depth >= 1) li.classList.add("is-collapsed");

    // If current hash is inside this subtree, expand it so the reader sees where they are
    if (currentHash && li.querySelector(`a[href="${currentHash}"]`)) {
      li.classList.remove("is-collapsed");
      li.classList.add("is-expanded");
    }

    const link = li.querySelector(":scope > a.md-nav__link");
    if (!link) return;

    // Toggle collapse/expand on click, but allow normal navigation
    link.addEventListener("click", () => {
      if (depth < 1) return; // don't toggle H2-ish level
      li.classList.toggle("is-collapsed");
      li.classList.toggle("is-expanded");
    });
  });
});
