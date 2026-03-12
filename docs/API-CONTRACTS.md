# API contracts

## POST `/api/analysis`
Runs the trusted analysis pipeline.

### Request
```json
{
  "sessionId": "swing-123",
  "title": "Driver range swing",
  "mode": "screen",
  "swingSide": "right",
  "screenMode": true,
  "screenDiagnostics": {
    "brightnessMean": 0.58,
    "contrast": 0.51,
    "glareRatio": 0.12,
    "edgeDensity": 0.45,
    "borderConfidence": 0.71,
    "subjectScale": 0.46,
    "anglePenalty": 0.08,
    "bandingScore": 0.14
  }
}
```

### Response
Returns:
- `structured`
- `llmReadyPayload`

## GET `/api/jobs`
Returns seeded demo jobs. In production this should query D1 or Durable Objects.

## GET `/api/jobs/[id]`
Returns one seeded demo job.

## Worker `/analysis`
Optional dedicated gateway for a heavier external analysis service.
