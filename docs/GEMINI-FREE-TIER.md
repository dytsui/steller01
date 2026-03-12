# Gemini free-tier usage notes

This package is designed so Gemini is not responsible for action facts.

## Allowed Gemini role in this repo

- report headline
- summary
- quick tip
- good points
- priorities
- coach script
- share captions later

## Not allowed

- deciding whether a swing issue exists
- inventing measurements
- inventing phase timestamps
- inventing tempo
- inventing screen quality facts

## Lowest-cost path

Use `gemini-2.5-flash-lite` as the default model in `.env.example`.
If no API key is set, the app falls back to the built-in report generator.
