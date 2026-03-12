# steller01 Architecture

## Product rule
The core rule of this package is:

`video input -> preprocessing -> pose / time-series / metrics / issue detection -> structured analysis JSON -> coaching report`

The report is generated last. It never invents facts ahead of the analysis layer.

## Runtime shape
- **Next.js app router in repo root** for product UI and route handlers
- **Cloudflare Workers + OpenNext adapter** for deployment target
- **D1 / R2 / Queue / Durable Objects bindings** already declared in `wrangler.jsonc`
- **TypeScript analysis engine** in `lib/analysis/*`
- **Optional external heavy inference endpoint** via `EXTERNAL_ANALYSIS_ENDPOINT`

## Analysis engines included
1. `phase-engine.ts`
2. `tempo-engine.ts`
3. `kinematics-engine.ts`
4. `screen-mode.ts`
5. `issue-rules.ts`
6. `score-engine.ts`
7. `compare-engine.ts`
8. `report-generator.ts`

## Screen Mode design
The current package computes real quality heuristics:
- contrast
- glare ratio
- edge density
- border confidence
- subject scale
- banding score
- angle penalty
- readability and screen confidence

When quality falls below threshold, the product warns the user to re-capture instead of pretending the analysis is trustworthy.

## Commercial page model
- Home
- Capture
- Upload
- Report
- Records
- Training
- Students
- Jobs
- Brand

## Current truth
This package already includes:
- full product shell
- structured analysis pipeline
- premium result page
- demo data
- Cloudflare deployment config
- schema and seed

Heavy OpenCV / YOLO inference is **prepared as an extension point**, not bundled into the Worker runtime itself.
