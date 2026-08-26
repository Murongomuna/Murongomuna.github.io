# Wisdom Makaza portfolio website

This is a static portfolio designed for GitHub Pages. It uses plain HTML, CSS, and JavaScript, so it does not require a build process.

## The one file to edit for projects

Open `assets/js/projects.js`. Every item in `window.PORTFOLIO_PROJECTS` becomes a card automatically.

Example:

```js
{
  title: "New analysis project",
  category: "Dashboards",
  accent: "sun",
  description: "A short explanation of the business question, your approach, and the result.",
  tags: ["SQL", "Excel", "Dashboard"],
  links: [
    { label: "View project", url: "https://github.com/Murongomuna/project-name" },
    { label: "Read report", url: "projects/report-name.pdf" }
  ]
}
```

Available accent names are `plum`, `mint`, `sun`, and `blue`. A new category automatically creates a new filter button.

## Adding files

1. Put public project PDFs in the `projects` folder.
2. Give each file a short, lowercase name with hyphens.
3. Add its relative link in `assets/js/projects.js`, for example `projects/my-report.pdf`.
4. Never upload confidential customer, employer, or policyholder data.

## Private reports

The full dissertation and attachment research report are intentionally excluded from the public website. Their project cards provide concise, non-confidential summaries and state that the reports are available on request.

## Publishing on GitHub Pages

Replace the current repository files with this site's contents and keep GitHub Pages configured to publish from the `main` branch root. The `.nojekyll` file tells GitHub Pages to serve the site as plain static files.

## Project structure

```text
index.html
assets/
  css/styles.css
  js/projects.js
  js/site.js
projects/
  (add only files that are safe to publish)
```
