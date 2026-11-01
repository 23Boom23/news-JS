# news-JS

News API application migrated to TypeScript. [Live demo](https://23boom23.github.io/news-JS/).

## Run application

1. Copy `.env.example` to `.env` and set `API_KEY` to your News API key. The configured URL uses the proxy needed for deployed applications.
2. Run `npm install`.
3. Run `npm start`.

Without a key, the app uses the proxy's static mock endpoints. `.env` is ignored by Git. A production build made with a key includes that key in the browser bundle.

## Checks

Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Deployment

Run `npm run deploy` to publish `dist/` to `gh-pages`.
