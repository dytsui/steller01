import catalog from "@/data/demo/issue-catalog.json";
import type { IssueDetection, MetricSnapshot, ScreenDiagnostics } from "@/lib/analysis/types";
import { round } from "@/lib/utils";

function normalizeIssueId(id: string) {
  return id.replace(/_/g, "-").trim().toLowerCase();
}

function humanizeIssueId(id: string) {
  return id
    .replace(/[_-]+/g, " ")
    .replace(/\w/g, (char) => char.toUpperCase());
}

function catalogLabel(id: string) {
  const normalized = normalizeIssueId(id);
  const hit = catalog.find((item) => normalizeIssueId(item.id) === normalized);
  return hit?.label ?? humanizeIssueId(id);
}

function issue(
  id: string,
  severity: IssueDetection["severity"],
  confidence: number,
  evidence: string,
  quickTip: string,
  coachingNote: string
): IssueDetection {
  return {
    id,
    label: catalogLabel(id),
    severity,
    confidence: round(confidence, 2),
    evidence,
    quickTip,
    coachingNote
  };
}

export function detectIssues(metrics: MetricSnapshot, screen: Required<ScreenDiagnostics>): IssueDetection[] {
  const issues: IssueDetection[] = [];

  if (metrics.headSwayImpactCm > 2.8) {
    issues.push(issue(
      "head_sway",
      metrics.headSwayImpactCm > 3.6 ? "major" : "moderate",
      0.92,
      `Head moved ${metrics.headSwayImpactCm} cm from address to impact.`,
      "Keep the logo on your cap inside the same box through impact.",
      "Too much head travel changes low-point control and strike consistency."
    ));
  }

  if (metrics.hipTurnTop < 35) {
    issues.push(issue(
      "restricted_hip_turn",
      "moderate",
      0.86,
      `Hip turn at top is ${metrics.hipTurnTop}°, below the target window.`,
      "Rehearse trail-hip depth in slow motion with pause reps at the top.",
      "Limited hip turn reduces space and makes the downswing work too hard."
    ));
  }

  if (metrics.shoulderTurnTop < 74) {
    issues.push(issue(
      "flat_shoulder",
      "moderate",
      0.81,
      `Shoulder turn at top is ${metrics.shoulderTurnTop}°.`,
      "Let the lead shoulder move down and under the chin during backswing.",
      "A flatter turn often narrows the arc and hurts strike sequence."
    ));
  }

  if (metrics.xFactorTop < 32) {
    issues.push(issue(
      "low_xfactor",
      "minor",
      0.74,
      `X-Factor reached ${metrics.xFactorTop}° at top.`,
      "Create a little more separation by finishing the shoulder turn before transition.",
      "Low separation reduces stored stretch and limits speed without forcing more hands."
    ));
  }

  if (metrics.spineTiltImpact < metrics.spineTiltAddress - 7) {
    issues.push(issue(
      "spine_loss",
      "major",
      0.88,
      `Spine tilt fell from ${metrics.spineTiltAddress}° to ${metrics.spineTiltImpact}°.`,
      "Maintain chest-over-ball pressure while rotating through impact.",
      "Losing spine tilt early often leads to standing up and inconsistent face-to-path."
    ));
    issues.push(issue(
      "early_extension",
      "major",
      0.78,
      "Spine and pelvis geometry suggest early extension through the strike zone.",
      "Keep your glutes on an imaginary wall during slow rehearsal swings.",
      "Standing up narrows delivery space and usually pairs with contact misses."
    ));
  }

  if (metrics.tempoRatio < 2.7) {
    issues.push(issue(
      "tempo_fast",
      "moderate",
      0.93,
      `Backswing to downswing ratio is ${metrics.tempoRatio}:1.`,
      "Count “one-two-three / hit” to stretch the backswing and soften transition.",
      "A rushed transition removes sequence and makes timing fragile."
    ));
  } else if (metrics.tempoRatio > 3.5) {
    issues.push(issue(
      "tempo_slow",
      "minor",
      0.78,
      `Backswing to downswing ratio is ${metrics.tempoRatio}:1.`,
      "Shorten the rehearsal and start down earlier after the top.",
      "An overly long backswing can cost pressure shift and consistency."
    ));
  }

  if (metrics.finishBalance < 84) {
    issues.push(issue(
      "low_finish",
      "minor",
      0.72,
      `Finish balance score is ${metrics.finishBalance}.`,
      "Hold the finish for two seconds after each practice swing.",
      "A clean balanced finish is a simple proxy for good sequence and deceleration."
    ));
  }

  if (screen.glareRatio > 0.2) {
    issues.push(issue(
      "screen_glare",
      "moderate",
      0.89,
      `Glare ratio measured ${round(screen.glareRatio * 100, 0)}%.`,
      "Tilt the phone slightly and reduce reflections before re-capturing.",
      "Glare hides wrists, shaft, and shoulder line detail."
    ));
  }

  if (screen.subjectScale < 0.28) {
    issues.push(issue(
      "screen_subject_small",
      "moderate",
      0.84,
      `Subject scale is ${round(screen.subjectScale * 100, 0)}% of target.`,
      "Move closer so the golfer fills more of the visible screen.",
      "Small on-screen subjects make phase detection and joint locking less reliable."
    ));
  }

  if (screen.anglePenalty > 0.18) {
    issues.push(issue(
      "screen_angle_bad",
      "moderate",
      0.83,
      `Screen angle penalty reached ${round(screen.anglePenalty * 100, 0)}%.`,
      "Shoot more square to the display to reduce perspective distortion.",
      "Too much angle makes lines and rotations look wrong even before analysis begins."
    ));
  }

  if (screen.bandingScore > 0.26) {
    issues.push(issue(
      "screen_banding",
      "minor",
      0.75,
      `Banding score reached ${round(screen.bandingScore * 100, 0)}%.`,
      "Lower shutter speed mismatch by changing distance or screen brightness.",
      "Visible banding usually means missing detail on key motion frames."
    ));
  }

  return issues.sort((a, b) => b.confidence - a.confidence);
}
