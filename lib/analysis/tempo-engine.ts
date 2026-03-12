import type { MetricSnapshot, PhaseDetection, PoseFrame } from "@/lib/analysis/types";
import { round } from "@/lib/utils";

export function calculateTempo(phases: PhaseDetection[], frames: PoseFrame[]) {
  const address = phases.find((phase) => phase.label === "Address") ?? phases[0];
  const top = phases.find((phase) => phase.label === "Top") ?? phases[1];
  const impact = phases.find((phase) => phase.label === "Impact") ?? phases[2];

  const backswingSec = Math.max(0.1, top.t - address.t);
  const downswingSec = Math.max(0.08, impact.t - top.t);
  const tempoRatio = round(backswingSec / downswingSec, 2);

  return {
    tempoRatio,
    backswingSec: round(backswingSec, 2),
    downswingSec: round(downswingSec, 2),
    sampledFrames: frames.length
  };
}

export function applyTempo(metrics: Omit<MetricSnapshot, "tempoRatio" | "backswingSec" | "downswingSec">, phases: PhaseDetection[], frames: PoseFrame[]): MetricSnapshot {
  const tempo = calculateTempo(phases, frames);
  return {
    ...metrics,
    tempoRatio: tempo.tempoRatio,
    backswingSec: tempo.backswingSec,
    downswingSec: tempo.downswingSec
  };
}
