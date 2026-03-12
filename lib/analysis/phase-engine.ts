import type { PhaseDetection, PoseFrame } from "@/lib/analysis/types";

function confidence(index: number, total: number) {
  const distanceFromCenter = Math.abs((index / total) - 0.5);
  return Math.max(0.72, 0.96 - distanceFromCenter * 0.2);
}

export function detectPhases(frames: PoseFrame[]): PhaseDetection[] {
  const total = frames.length - 1;
  const addressFrame = frames[0];
  const topFrame = frames.reduce((best, frame) => (
    frame.joints.rightWrist.y < best.joints.rightWrist.y ? frame : best
  ), frames[0]);

  const impactFrame = frames.reduce((best, frame) => {
    const wristDistance = Math.abs(frame.joints.rightWrist.y - frame.joints.rightHip.y);
    const bestDistance = Math.abs(best.joints.rightWrist.y - best.joints.rightHip.y);
    return wristDistance < bestDistance ? frame : best;
  }, frames[0]);

  const finishFrame = frames[frames.length - 1];

  return [
    { label: "Address", frameIndex: addressFrame.index, t: addressFrame.t, confidence: confidence(addressFrame.index, total) },
    { label: "Top", frameIndex: topFrame.index, t: topFrame.t, confidence: confidence(topFrame.index, total) },
    { label: "Impact", frameIndex: impactFrame.index, t: impactFrame.t, confidence: confidence(impactFrame.index, total) },
    { label: "Finish", frameIndex: finishFrame.index, t: finishFrame.t, confidence: confidence(finishFrame.index, total) }
  ];
}
