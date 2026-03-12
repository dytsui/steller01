# Cloudflare-first deployment

## 1) Connect GitHub to Cloudflare Workers Builds
Use this repository root directly. Do not add `apps/web`.

Build command:
```bash
npm run deploy
```

## 2) Required vars
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_DEFAULT_LOCALE`
- `NEXT_PUBLIC_ENABLE_DEMO_DATA`

## 3) Optional Gemini layer
Set:
- `GEMINI_MODEL=gemini-2.5-flash-lite`
- `GEMINI_API_BASE=https://generativelanguage.googleapis.com/v1beta`

Add secret:
```bash
wrangler secret put GEMINI_API_KEY
```

Without the key, the app still runs and uses the built-in coach report generator.

## 4) Bindings
Create and bind:
- D1: `DB`
- R2: `VIDEOS_BUCKET`, `EXPORTS_BUCKET`
- Queue: `ANALYSIS_QUEUE`
- Durable Object: `JOB_ROOM`

## 5) Database
```bash
npm run db:apply
npm run db:seed
```

## 6) Next.js on Cloudflare
The repo is already configured for OpenNext + Workers via:
- `open-next.config.ts`
- `wrangler.jsonc`
