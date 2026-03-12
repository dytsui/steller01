# Structured analysis examples

## Demo payload fields
- sessionId
- title
- mode
- phases
- metrics
- issues
- screen
- score
- comparison
- overlays
- report
- reportMeta
- trainingPlan
- warnings

## Rule
Coach language is downstream of these fields.
No LLM layer may overwrite metrics or issues unless a trusted upstream analysis service says so.
