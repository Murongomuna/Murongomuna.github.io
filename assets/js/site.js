(function () {
  "use strict";

  /* ---------- Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Header, progress bar, back-to-top ---------- */
  var header = document.getElementById("site-header");
  var progress = document.getElementById("progress-bar");
  var toTop = document.getElementById("to-top");
  var dotNav = document.querySelector(".dot-nav");
  var hero = document.getElementById("home");
  var contact = document.getElementById("contact");

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    header.classList.toggle("scrolled", y > hero.offsetHeight - 90);
    toTop.classList.toggle("show", y > 600);

    // Dot nav: switch to light style over dark sections
    var mid = y + window.innerHeight / 2;
    var overDark = mid < hero.offsetHeight || mid > contact.offsetTop;
    dotNav.classList.toggle("on-dark", overDark);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Scrollspy (active section highlighting) ---------- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = Array.prototype.map.call(
    document.querySelectorAll(".dot-nav a"),
    function (a) { return document.querySelector(a.getAttribute("href")); }
  );

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = "#" + entry.target.id;
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { if (s) spy.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { revealer.observe(el); });

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute("data-count"), 10);
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (c) { counterObs.observe(c); });

  /* ---------- Projects: filters, cards, modal ---------- */
  var projects = window.PROJECTS || [];
  var filterWrap = document.getElementById("project-filters");
  var grid = document.getElementById("project-grid");
  var modal = document.getElementById("project-modal");
  var modalBody = document.getElementById("modal-body");
  var lastFocus = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var categories = ["All"];
  projects.forEach(function (p) { if (categories.indexOf(p.category) === -1) categories.push(p.category); });

  function count(cat) {
    return cat === "All" ? projects.length : projects.filter(function (p) { return p.category === cat; }).length;
  }

  filterWrap.innerHTML = categories.map(function (cat, i) {
    return '<button class="filter-btn" role="tab" aria-selected="' + (i === 0) + '" data-cat="' + esc(cat) + '">' +
      esc(cat) + '<span class="count">' + count(cat) + "</span></button>";
  }).join("");

  function render(cat) {
    var list = cat === "All" ? projects : projects.filter(function (p) { return p.category === cat; });
    grid.innerHTML = list.map(function (p, i) {
      var idx = projects.indexOf(p);
      return '<button class="project-card' + (p.featured && cat === "All" ? " featured" : "") + '" data-idx="' + idx + '" style="animation-delay:' + (i * 60) + 'ms">' +
        '<span class="project-type">' + esc(p.category) + "</span>" +
        "<h3>" + esc(p.title) + "</h3>" +
        '<p class="project-summary">' + esc(p.summary) + "</p>" +
        '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
        '<span class="project-more">View details →</span>' +
        "</button>";
    }).join("");
  }

  filterWrap.addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterWrap.querySelectorAll(".filter-btn").forEach(function (b) { b.setAttribute("aria-selected", String(b === btn)); });
    render(btn.getAttribute("data-cat"));
  });

  function openModal(p) {
    lastFocus = document.activeElement;
    modalBody.innerHTML =
      '<p class="eyebrow">' + esc(p.category) + "</p>" +
      '<h3 id="modal-title">' + esc(p.title) + "</h3>" +
      (p.subtitle ? '<p style="color:var(--forest-600);font-weight:600">' + esc(p.subtitle) + "</p>" : "") +
      "<ul>" + p.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
      '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
      (p.note ? '<p class="modal-note">' + esc(p.note) + "</p>" : "") +
      (p.links && p.links.length ? '<div class="modal-links">' + p.links.map(function (l) {
        return '<a class="btn btn-green" href="' + esc(l.url) + '" target="_blank" rel="noreferrer">' + esc(l.label) + " ↗</a>";
      }).join("") + "</div>" : "");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".project-card");
    if (card) openModal(projects[+card.getAttribute("data-idx")]);
  });
  modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  render("All");
})();
