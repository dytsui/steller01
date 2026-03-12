# Extension points

## Already wired
- `EXTERNAL_ANALYSIS_ENDPOINT`
- `EXTERNAL_ANALYSIS_TOKEN`
- `LLM_REPORT_ENDPOINT`
- `LLM_REPORT_TOKEN`
- Worker queue consumer
- Durable Object job room
- D1 schema
- R2 bucket bindings

## Recommended next expansion
1. Replace demo sequence generation with browser MediaPipe / external pose service landmarks
2. Move uploaded video files into R2
3. Persist created reports into D1
4. Push async job progress updates through Durable Objects / SSE
5. Add premium content mapping from issue IDs to drills / videos / lesson bundles
6. Add coach / academy account model on top of students table

## Important rule for future development
Do not bypass the structured analysis layer. Any future AI report model must consume only the structured payload and guardrails.
