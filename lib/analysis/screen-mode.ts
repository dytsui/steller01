import type { ScreenDiagnostics } from "@/lib/analysis/types";
import { clamp, round } from "@/lib/utils";

export function enrichScreenDiagnostics(source?: ScreenDiagnostics): Required<ScreenDiagnostics> {
  const base: Required<ScreenDiagnostics> = {
    brightnessMean: source?.brightnessMean ?? 0.58,
    contrast: source?.contrast ?? 0.52,
    glareRatio: source?.glareRatio ?? 0.12,
    edgeDensity: source?.edgeDensity ?? 0.44,
    borderConfidence: source?.borderConfidence ?? 0.68,
    subjectScale: source?.subjectScale ?? 0.46,
    anglePenalty: source?.anglePenalty ?? 0.08,
    bandingScore: source?.bandingScore ?? 0.14,
    readabilityScore: source?.readabilityScore ?? 0,
    screenConfidence: source?.screenConfidence ?? 0,
    warnings: [...(source?.warnings ?? [])]
  };

  const readability = clamp(
    (
      base.contrast * 34 +
      base.edgeDensity * 20 +
      base.subjectScale * 22 +
      base.borderConfidence * 16 -
      base.glareRatio * 16 -
      base.bandingScore * 10 -
      base.anglePenalty * 12
    ) * 100 / 80,
    0,
    100
  );

  const confidence = clamp(
    (
      base.borderConfidence * 28 +
      base.subjectScale * 18 +
      base.edgeDensity * 18 +
      base.contrast * 16 -
      base.glareRatio * 10 -
      base.bandingScore * 7 -
      base.anglePenalty * 9
    ) * 100 / 54,
    0,
    100
  );

  base.readabilityScore = round(readability, 1);
  base.screenConfidence = round(confidence, 1);

  if (base.readabilityScore < 65) {
    base.warnings.push("Screen readability is below threshold. Re-shoot or move closer.");
  }
  if (base.glareRatio > 0.2) {
    base.warnings.push("Strong reflections detected on screen surface.");
  }
  if (base.subjectScale < 0.28) {
    base.warnings.push("Golfer occupies too little of the visible screen area.");
  }
  if (base.anglePenalty > 0.18) {
    base.warnings.push("Capture angle is too oblique for reliable screen analysis.");
  }

  return base;
}
