# NASA Image Explorer (mp2)

Lightweight React + TypeScript single-page app that searches and browses the NASA Image and Video Library. It was built for a class project and uses a small custom API client, React Context for state, TanStack Table for the list view, and a dark, space-themed UI.

Live demo
-----------
You can visit the deployed site here:

https://changju784.github.io/mp2/

What you'll find
---------------
- Search NASA images (client-side search and pagination)
- Gallery and list views
- Detail pages with image, date, and description
- Dark, space-themed UI with responsive layout

Quick start (development)
-------------------------
Requirements
- Node.js 18+ (or Node 20 recommended)
- npm

Run locally

1. Open a terminal in the project folder `mp2` (this README lives in `mp2/`).
2. Install dependencies:

```powershell
npm ci
```

3. Start the dev server:

```powershell
npm start
```

The app will open at http://localhost:3000 by default (Create React App).

Build for production
---------------------
From the `mp2` folder:

```powershell
npm ci
npm run build
```

This produces a production-ready `build/` folder (the GitHub Actions workflow is configured to build from `./mp2` and publish that `build/` directory to GitHub Pages).

Project structure (high level)
------------------------------
- `src/`
  - `api/` — small NASA API client and TypeScript types
  - `context/` — React Context provider used to share search results
  - `views/` — List/Gallery/Detail React components
  - `utils/formatDate.ts` — helper that formats timestamps to YYYY-MM-DD
  - `theme.css` — global dark theme and component styles