import type { MetricSnapshot, PhaseDetection, Point, PoseFrame } from "@/lib/analysis/types";
import { round } from "@/lib/utils";

function angleBetween(a: Point, b: Point) {
  return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function distance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function cmFromNormalized(value: number) {
  return round(value * 100, 1);
}

export function computeKinematics(
  frames: PoseFrame[],
  phases: PhaseDetection[]
): Omit<MetricSnapshot, "tempoRatio" | "backswingSec" | "downswingSec"> {
  const lookup = (label: string) => {
    const match = phases.find((phase) => phase.label === label);
    return frames.find((frame) => frame.index === match?.frameIndex) ?? frames[0];
  };

  const address = lookup("Address");
  const top = lookup("Top");
  const impact = lookup("Impact");
  const finish = lookup("Finish");

  const shoulderTurnTop = round(Math.abs(angleBetween(top.joints.leftShoulder, top.joints.rightShoulder) - angleBetween(address.joints.leftShoulder, address.joints.rightShoulder)));
  const hipTurnTop = round(Math.abs(angleBetween(top.joints.leftHip, top.joints.rightHip) - angleBetween(address.joints.leftHip, address.joints.rightHip)));
  const xFactorTop = round(Math.max(0, shoulderTurnTop - hipTurnTop));

  const addressShoulderMid = midpoint(address.joints.leftShoulder, address.joints.rightShoulder);
  const addressHipMid = midpoint(address.joints.leftHip, address.joints.rightHip);
  const impactShoulderMid = midpoint(impact.joints.leftShoulder, impact.joints.rightShoulder);
  const impactHipMid = midpoint(impact.joints.leftHip, impact.joints.rightHip);

  const spineTiltAddress = round(90 - Math.abs(angleBetween(addressShoulderMid, addressHipMid)));
  const spineTiltImpact = round(90 - Math.abs(angleBetween(impactShoulderMid, impactHipMid)));
  const headSwayImpactCm = cmFromNormalized(Math.abs(impact.joints.nose.x - address.joints.nose.x));
  const wristArcHeight = cmFromNormalized(Math.abs(top.joints.rightWrist.y - impact.joints.rightWrist.y));
  const finishBalance = round(Math.max(0, 100 - (distance(finish.joints.leftAnkle, finish.joints.rightAnkle) * 100)));

  return {
    shoulderTurnTop,
    hipTurnTop,
    xFactorTop,
    spineTiltAddress,
    spineTiltImpact,
    headSwayImpactCm,
    wristArcHeight,
    finishBalance,
    screenReadability: 0,
    screenConfidence: 0
  };
}
