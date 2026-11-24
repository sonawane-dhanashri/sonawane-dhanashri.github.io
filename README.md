# Dhanashri Sonawane — portfolio

The source of [sonawane-dhanashri.github.io](https://sonawane-dhanashri.github.io), the portfolio of Dhanashri Sonawane, a software engineer in Pune building generative AI products.

Built with [Astro](https://astro.build) as a fully static site, with plain CSS and no UI framework.

## Run it locally

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to /dist
npx astro check    # type and content checks
```

Requires Node.js 22 or later.

## Structure

- `src/content/work/` — one Markdown file per case study, including its diagram
- `src/data/` — site details, experience, education and skills
- `src/components/Diagram.astro` — the pipeline diagram used on every project
- `src/styles/tokens.css` — colours, type and spacing for both themes

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.
