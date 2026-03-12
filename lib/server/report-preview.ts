import { runAnalysis } from "@/lib/analysis/pipeline";

export function buildReportPreview(sessionId: string) {
  return runAnalysis({
    sessionId,
    title: `Preview ${sessionId}`,
    mode: sessionId.includes("screen") ? "screen" : "upload",
    swingSide: "right",
    screenMode: sessionId.includes("screen"),
    historyMetrics: [
      {
        tempoRatio: 2.8,
        shoulderTurnTop: 83,
        hipTurnTop: 38,
        xFactorTop: 35,
        spineTiltImpact: 26,
        headSwayImpactCm: 2.9,
        finishBalance: 88,
        screenReadability: 84
      }
    ]
  });
}
