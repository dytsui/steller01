import type { IssueDetection, MetricSnapshot, PhaseDetection, ScreenDiagnostics } from "@/lib/analysis/types";
import { clamp, round } from "@/lib/utils";

export function computeScore(
  metrics: MetricSnapshot,
  phases: PhaseDetection[],
  issues: IssueDetection[],
  screen: Required<ScreenDiagnostics>
) {
  const phaseScore = phases.reduce((sum, phase) => sum + phase.confidence, 0) / phases.length * 100;
  const tempoScore = 100 - Math.min(30, Math.abs(3 - metrics.tempoRatio) * 30);
  const kinematicScore = (
    Math.max(0, 100 - Math.abs(84 - metrics.shoulderTurnTop)) * 0.24 +
    Math.max(0, 100 - Math.abs(43 - metrics.hipTurnTop)) * 0.18 +
    Math.max(0, 100 - Math.abs(41 - metrics.xFactorTop)) * 0.16 +
    Math.max(0, 100 - Math.abs(31 - metrics.spineTiltImpact)) * 0.22 +
    Math.max(0, 100 - (metrics.headSwayImpactCm * 11)) * 0.20
  );

  const issuePenalty = issues.reduce((sum, current) => {
    const weight = current.severity === "major" ? 9 : current.severity === "moderate" ? 5 : 2.5;
    return sum + weight * current.confidence;
  }, 0);

  const screenScore = screen.readabilityScore * 0.6 + screen.screenConfidence * 0.4;
  const total = clamp(
    phaseScore * 0.12 +
      tempoScore * 0.18 +
      kinematicScore * 0.38 +
      (100 - issuePenalty) * 0.22 +
      screenScore * 0.10,
    42,
    98
  );

  return {
    total: round(total, 1),
    subscores: {
      phase: round(phaseScore, 1),
      tempo: round(tempoScore, 1),
      kinematics: round(kinematicScore, 1),
      issueControl: round(clamp(100 - issuePenalty), 1),
      screen: round(screenScore, 1)
    }
  };
}
