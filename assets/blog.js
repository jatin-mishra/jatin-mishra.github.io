// Renders ```mermaid code blocks as diagrams. Mermaid is fetched only on
// posts that actually contain a diagram.
(async () => {
  const blocks = document.querySelectorAll(".language-mermaid");
  if (!blocks.length) return;

  try {
    const { default: mermaid } = await import(
      "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
    );
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      fontFamily: '"Manrope", system-ui, sans-serif',
      themeVariables: {
        darkMode: true,
        background: "#0d1226",
        primaryColor: "#16204a",
        primaryBorderColor: "#5b7dff",
        primaryTextColor: "#ffffff",
        secondaryColor: "#12312a",
        tertiaryColor: "#141a33",
        lineColor: "#8fa6ff",
        textColor: "#d7def5",
        edgeLabelBackground: "#0d1226",
        noteBkgColor: "#2a2440",
        noteTextColor: "#ffffff",
        noteBorderColor: "#7b61ff",
      },
    });

    let n = 0;
    for (const block of blocks) {
      // Rouge wraps the block in a div; a bare <code> appears if highlighting is off.
      const wrapper = block.matches("code") ? block.closest("pre") : block;
      const source = block.textContent.trim();
      try {
        const { svg } = await mermaid.render(`diagram-${n++}`, source);
        const figure = document.createElement("div");
        figure.className = "diagram";
        figure.innerHTML = svg;
        // Keep wide diagrams legible on phones: scroll instead of shrinking.
        const el = figure.querySelector("svg");
        const natural = el?.viewBox?.baseVal?.width || 0;
        if (el && natural) el.style.minWidth = `${Math.min(natural * 0.75, 600)}px`;
        wrapper.replaceWith(figure);
      } catch (err) {
        wrapper.classList.add("is-failed"); // leave the source visible
        console.error("Mermaid diagram failed to render:", err);
      }
    }
  } catch (err) {
    blocks.forEach((b) => b.classList.add("is-failed"));
    console.error("Could not load Mermaid:", err);
  }
})();
