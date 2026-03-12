# Queue / Durable Object runbook

## Normal path
upload -> analysis queue -> worker consumer -> structured analysis -> report generation -> D1 write-back -> R2 asset references

## Future fault handling
- dead-letter queue for repeated failures
- DO room state for live job progress
- retry button from `/jobs/[id]`
- support diagnostics dump
