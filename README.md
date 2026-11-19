# Funda IsiNdebele (web)

A web app for learning Southern Ndebele (isiNdebele): proverbs, animals, surnames, a picture dictionary, everyday basics and history. It is the web version of the [Funda IsiNdebele Android app](https://play.google.com/store/apps/details?id=com.epakameni.funda&hl=en_GB), rebuilt in React and TypeScript.

## Features

- **Welcome page** (`/welcome`) that explains the app and shares facts about the Ndebele people. The app opens here.
- **Home** (`/home`) with a "Learn something new" card. It shows a random word every 8 seconds and keeps the meaning hidden until you press *Show meaning*.
- **Sections**
  - **Wisdom:** proverbs (*Izaga*), idioms (*Izitjho*) and riddles (*Inrarejo*), each with a hideable answer.
  - **Animals:** birds, carnivores, herbivores, snakes, insects and domestic animals, with search.
  - **Surnames:** clan praise names (*Imbongo*), with search and sharing.
  - **Image Dictionary:** planets, kinship, body parts, colours, fruit and vegetables, traditional attire.
  - **Basics:** numbers, directions, seasons, months, days and time.
  - **History:** places, rivers, Nzunza and Manala kings, traditional names and initiation groups.
- **Light and dark themes.** The choice is saved per device.
- **Installable and offline-ready.** A service worker caches the app, its images and API data.
- **Responsive.** Works on phones and desktops.

## Tech stack

- [React 19](https://react.dev) + TypeScript, built with [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) for navigation
- [Astryx](https://astryx.atmeta.com/) design system (stone theme, re-tinted with an Ndebele palette)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) for the service worker
- Hosted on [Vercel](https://vercel.com)

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev       # development server at http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Starts the development server. The service worker is off in dev mode. |
| `npm run build` | Type-checks and builds the production app into `dist/`, including the service worker. |
| `npm run preview` | Serves the built `dist/` locally. Use this to test caching and installing. |

## Deploying to Vercel

The repository is ready for Vercel; all settings live in [`vercel.json`](vercel.json).

1. In Vercel, choose **Add New → Project** and import `PTMahlangu/Funda_web_app` from GitHub.
2. Keep the detected settings (framework **Vite**, build `npm run build`, output `dist`). No environment variables are needed.
3. Click **Deploy**. Every push to `main` then deploys to production, and other branches get preview URLs.

Or from the command line:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

`vercel.json` sets up:

| Setting | Why |
|---|---|
| Rewrite `/api/*` → the Funda API (`/Prod/*`) | The API sends no CORS headers, so the browser calls the app's own `/api` and Vercel forwards it. |
| Rewrite every other path → `/index.html` | Lets links such as `/home` or `/wisdom` load directly (single-page app). |
| `sw.js`, `registerSW.js`, `manifest.webmanifest` never cached | New versions of the service worker reach users promptly. |
| `/assets/*` cached for a year | File names include a content hash, so they are safe to cache forever. |

Vercel serves over HTTPS, which the service worker and the **Install app** button need.

## Project structure

```
public/            Static files: images (img/), app icons, manifest, Ndebele SVG patterns
src/
  api.ts           API calls (wisdom, animals, dictionary, surnames, history)
  learn.ts         Word pool for the "Learn something new" card
  theme.ts         Astryx theme with the Ndebele colours (light and dark)
  styles.css       App styles, patterns and dark-mode overrides
  components/      Shared UI: screen layout, cards, tabs, drawer, theme switch, install hook
  data/            Built-in vocabulary (database.ts) and Ndebele facts (facts.ts)
  pages/           One file per screen
vite.config.ts     Local API proxy and service-worker caching rules
vercel.json        Vercel build, rewrites and headers
```

## API

Data comes from the Funda API on AWS API Gateway (`https://2ptf02nybg.execute-api.us-east-1.amazonaws.com/Prod`). The app always calls `/api/...`:

- **Locally**, Vite forwards `/api/*` to the API (see `vite.config.ts`, used by `dev` and `preview`).
- **On Vercel**, the rewrite in `vercel.json` does the same.

## Caching

The service worker (generated at build time) uses three rules:

| Content | Strategy | Limits |
|---|---|---|
| App code, styles, icons and `public/img` | Precached on install | Updated on each new build |
| API responses (`/api/*`) | Stale-while-revalidate: cached copy first, refreshed in the background | 100 entries, 30 days |
| Photos from image hosts | Cache-first: downloaded once | 200 images, 14 days |

## Known issues

- **Many photos are missing.** Most image links in the API data point to Amazon S3 buckets that now return 404 (for example birds, herbivores, snakes, insects, domestic animals, kinship and body parts). Images hosted on Backblaze still load. Fixing this needs the images re-uploaded or the links in the API data updated.
- **Large bundle.** The JavaScript bundle is about 870 kB (280 kB gzipped), mostly from the design system. It could be split per page with lazy-loaded routes.

## Credits and sources

- *Animal names in IsiNdebele (Ndzundza) and English*, article by Makhosini Mahlangu
- *As'khumbuzaneni MaNdebele*, Facebook group
- *Iziko Lamakhosi* (ISBN 978-07960-4084-8)
- *Ndzundza Dynasty – kwaMahlangu* (ISBN 978-0-620-67362-4)
