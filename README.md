# Newsroom

A responsive news reader migrated from the [RSSchool News JS starter](https://github.com/rolling-scopes-school/news-JS) to strict TypeScript. It displays publishers and up to ten articles from the selected source.

## Run locally

```bash
npm install
npm start
```

Open the address printed by webpack dev server. With no API key, the app uses the proxy's static `/mocks/sources` and `/mocks/everything` endpoints. That article dataset currently contains stories for only one publisher, so other sources can show an empty state. The mock is useful for development without spending News API requests.

To use live news, set environment variables **before** `npm start` or `npm run build`:

```powershell
$env:API_URL = 'https://rss-news-api.onrender.com/'
$env:API_KEY = 'your-news-api-key'
npm start
```

The client uses the proxy's `/sources` and `/everything` endpoints when a key is present. The key is embedded in the browser bundle, so use a key intended for this public client and do not commit it to the repository.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

The production build is written to `dist/`. The TypeScript project enables `strict` and `noImplicitAny`; ESLint enables `@typescript-eslint/no-explicit-any`. The code uses interfaces for API data, an endpoint enum, a generic response loader, union types for nullable API fields, access modifiers on classes, and `Partial`, `Pick`, and `Readonly` utility types.

## Layout

The starter's CSS and article/source templates are retained. The application adds a loading and empty-state message, keyboard access to the source selector, and the required footer links and logo.

## Repository workflow

For the course submission, fork the original repository into your GitHub account and point `origin` at that fork. Push the `news-api` branch, then run `npm run deploy` to publish `dist/` to the fork's `gh-pages` branch. Open a pull request **from `news-api` to `main` in your own fork**. Keep the pull request open for cross-check and submit its URL in RS App. Do not merge it before review.
