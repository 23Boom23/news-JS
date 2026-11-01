# Newsroom

[Live application](https://23boom23.github.io/news-JS/) · [Source repository](https://github.com/23Boom23/news-JS)

A responsive news reader migrated from the [RSSchool News JS starter](https://github.com/rolling-scopes-school/news-JS) to strict TypeScript. It displays publishers and up to ten articles from the selected source.

## Run locally

```bash
npm install
npm start
```

Open the address printed by webpack dev server. With no API key, the app uses the proxy's static `/mocks/sources` and `/mocks/everything` endpoints. That article dataset currently contains stories for only one publisher, so other sources can show an empty state. The mock is useful for development without spending News API requests.

To use live news, copy `.env.example` to `.env` and replace the example key with your News API key:

```powershell
Copy-Item .env.example .env
# Edit API_KEY in .env, then run:
npm start
```

The client uses the proxy's `/sources` and `/everything` endpoints when a key is present. `.env` is ignored by Git. The key is embedded in the browser bundle, so use a key intended for this public client and do not commit it to the repository.

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

This repository is a public fork of the starter. Development is on `news-api`; `main` retains the starter, and `gh-pages` contains the production build. Keep the pull request from `news-api` to `main` open for cross-check.
