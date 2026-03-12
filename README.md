HOTFIX: this build removes required D1/R2/Queue/DO bindings for the first Cloudflare deploy. Add them later after the site is live.

# steller01

Cloudflare-first, root-deployable, non-monorepo golf AI coach product package.

## What is inside
- complete app router structure in `app/`
- capture, upload, report, records, training, students, jobs, brand, compare, pro, settings
- video-first capture and upload experience with ~70–80% viewport stage
- structured analysis pipeline in `lib/analysis/`
- Gemini report enhancer that only consumes structured payload
- D1 schema and seed
- Workers / Queue / Durable Object scaffolding
- demo records, jobs, students, drills, video recommendations, share captions
- brand assets in SVG and PNG

## Core principle
Video input -> preprocessing -> phase detection -> tempo / kinematics -> issues -> score -> structured JSON -> Gemini copy layer.

Gemini is never the source of swing truth in this repository.

## Quick deploy
1. Push repo to GitHub.
2. Connect to Cloudflare Workers Builds.
3. Add environment variables from `.env.example`.
4. Provision D1 / R2 / Queue / Durable Object.
5. Run D1 schema and seed.
6. Deploy.

See `docs/CLOUDFLARE-DEPLOY.md` and `docs/DEPLOY-CHECKLIST.md`.

## Product pages
- `/`
- `/capture`
- `/upload`
- `/report/[id]`
- `/records`
- `/records/[id]`
- `/training`
- `/students`
- `/students/[id]`
- `/jobs`
- `/jobs/[id]`
- `/brand`
- `/compare`
- `/pro`
- `/settings`
