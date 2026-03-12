# Cloudflare deploy checklist

1. Push this repository as-is to GitHub.
2. Connect the repo to Cloudflare Workers Builds.
3. Create D1, R2, Queue, and Durable Object bindings using the names in `wrangler.jsonc`.
4. Set environment variables from `.env.example`.
5. Run the D1 schema and seed scripts.
6. Deploy.
7. Open `/report/demo-home`, `/capture`, `/upload`, `/jobs`, `/students`, and `/brand` to verify UI completeness.

## Minimum variables

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_ENABLE_DEMO_DATA`
- `NEXT_PUBLIC_DEFAULT_LOCALE`
- `GEMINI_API_KEY`
- `GEMINI_MODEL=gemini-2.5-flash-lite`

## Optional heavy-analysis variables

- `EXTERNAL_ANALYSIS_ENDPOINT`
- `EXTERNAL_ANALYSIS_TOKEN`
- `LLM_REPORT_ENDPOINT`
- `LLM_REPORT_TOKEN`
