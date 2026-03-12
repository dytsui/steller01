# Screen Mode spec

## Purpose
Allow analysis from TV, projector, monitor, or tablet footage with clear trust gating.

## Current implemented diagnostics
- brightness mean
- contrast
- glare ratio
- edge density
- border confidence
- subject scale
- angle penalty
- banding score
- readability score
- screen confidence
- warnings

## Product behavior
- if readability and confidence stay acceptable, continue to structured analysis
- if quality is too poor, push explicit re-shoot prompts instead of pretending the read is reliable
