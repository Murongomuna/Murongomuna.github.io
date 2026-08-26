(function () {
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const grid = document.querySelector("#project-grid");
  const filters = document.querySelector("#project-filters");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();
  if (!grid || !filters) return;

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function createProjectCard(project, index) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.accent = project.accent || "plum";

    const topLine = document.createElement("div");
    topLine.className = "project-topline";

    const projectIndex = document.createElement("span");
    projectIndex.className = "project-index";
    projectIndex.textContent = String(index + 1).padStart(2, "0");

    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = project.category;

    topLine.append(projectIndex, category);

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const tagRow = document.createElement("div");
    tagRow.className = "tag-row";
    (project.tags || []).forEach((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      tagRow.appendChild(item);
    });

    card.append(topLine, title, description, tagRow);

    if (Array.isArray(project.links) && project.links.length) {
      const linkRow = document.createElement("div");
      linkRow.className = "project-links";

      project.links.forEach((link) => {
        const anchor = document.createElement("a");
        anchor.href = link.url;
        anchor.textContent = `${link.label} →`;
        if (isExternal(link.url)) {
          anchor.target = "_blank";
          anchor.rel = "noreferrer";
        }
        linkRow.appendChild(anchor);
      });

      card.appendChild(linkRow);
    } else {
      const status = document.createElement("div");
      status.className = "project-status";
      status.textContent = project.status || "Project link coming soon";
      card.appendChild(status);
    }

    return card;
  }

  function renderProjects(activeCategory) {
    const visible = activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

    grid.replaceChildren(...visible.map(createProjectCard));
  }

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${index === 0 ? " is-active" : ""}`;
    button.textContent = category;
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");

    button.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderProjects(category);
    });

    filters.appendChild(button);
  });

  renderProjects("All");
}());
