import { compareMetrics } from "@/lib/analysis/compare-engine";
import { createDemoSequence } from "@/lib/analysis/demo-sequence";
import { detectIssues } from "@/lib/analysis/issue-rules";
import { computeKinematics } from "@/lib/analysis/kinematics-engine";
import { detectPhases } from "@/lib/analysis/phase-engine";
import { generateCoachReport } from "@/lib/analysis/report-generator";
import { enrichScreenDiagnostics } from "@/lib/analysis/screen-mode";
import { computeScore } from "@/lib/analysis/score-engine";
import { calculateTempo } from "@/lib/analysis/tempo-engine";
import { buildTrainingPlan } from "@/lib/analysis/training-plan";
import type { AnalysisInput, AnalysisPayload, Point } from "@/lib/analysis/types";

function midpoint(a: Point, b: Point) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function runAnalysis(input: AnalysisInput): AnalysisPayload {
  const frames = input.landmarkFrames?.length ? input.landmarkFrames : createDemoSequence(input);
  const phases = detectPhases(frames);
  const screen = enrichScreenDiagnostics(input.screenDiagnostics);
  const kinematics = computeKinematics(frames, phases);
  const tempo = calculateTempo(phases, frames);
  const metrics = {
    ...kinematics,
    ...tempo,
    screenReadability: screen.readabilityScore,
    screenConfidence: screen.screenConfidence
  };
  const issues = detectIssues(metrics, screen);
  const score = computeScore(metrics, phases, issues, screen);
  const comparison = compareMetrics(metrics, input.historyMetrics);
  const impactFrame = frames.find((frame) => frame.index === phases.find((phase) => phase.label === "Impact")?.frameIndex) ?? frames[0];
  const addressFrame = frames[0];

  const structured = {
    sessionId: input.sessionId,
    title: input.title ?? input.videoMeta?.sourceLabel ?? "New swing session",
    mode: input.mode,
    phases,
    metrics,
    issues,
    screen,
    score,
    comparison,
    overlays: {
      ghostTrail: frames.map((frame) => frame.joints.rightWrist),
      spineLine: [
        midpoint(addressFrame.joints.leftShoulder, addressFrame.joints.rightShoulder),
        midpoint(addressFrame.joints.leftHip, addressFrame.joints.rightHip)
      ] as [Point, Point],
      shoulderLine: [impactFrame.joints.leftShoulder, impactFrame.joints.rightShoulder] as [Point, Point],
      hipLine: [impactFrame.joints.leftHip, impactFrame.joints.rightHip] as [Point, Point],
      headBox: {
        x: addressFrame.joints.nose.x - 0.04,
        y: addressFrame.joints.nose.y - 0.04,
        width: 0.08,
        height: 0.08
      }
    },
    report: {
      headline: "",
      summary: "",
      quickTip: "",
      goodPoints: [],
      priorities: [],
      coachScript: ""
    },
    reportMeta: {
      source: "rules" as const,
      model: "built-in-structured-report",
      generatedAt: new Date().toISOString(),
      locale: input.coachLocale ?? "zh-CN"
    },
    trainingPlan: buildTrainingPlan(issues),
    warnings: screen.warnings
  };

  return generateCoachReport(structured, input);
}
