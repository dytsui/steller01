import type { AnalysisInput, JointName, Point, PoseFrame } from "@/lib/analysis/types";

const jointNames: JointName[] = [
  "nose",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle"
];

type JointMap = Record<JointName, Point>;

function frame(index: number, t: number, joints: JointMap): PoseFrame {
  return { index, t, joints };
}

function lerp(a: number, b: number, amount: number) {
  return a + (b - a) * amount;
}

function morph(a: JointMap, b: JointMap, mix: number): JointMap {
  return jointNames.reduce((acc, key) => {
    acc[key] = {
      x: lerp(a[key].x, b[key].x, mix),
      y: lerp(a[key].y, b[key].y, mix),
      z: lerp(a[key].z ?? 0, b[key].z ?? 0, mix),
      confidence: 0.98
    };
    return acc;
  }, {} as JointMap);
}

const address: JointMap = {
  nose: { x: 0.49, y: 0.18 },
  leftShoulder: { x: 0.44, y: 0.28 },
  rightShoulder: { x: 0.56, y: 0.3 },
  leftElbow: { x: 0.41, y: 0.41 },
  rightElbow: { x: 0.58, y: 0.43 },
  leftWrist: { x: 0.45, y: 0.52 },
  rightWrist: { x: 0.53, y: 0.54 },
  leftHip: { x: 0.46, y: 0.47 },
  rightHip: { x: 0.55, y: 0.49 },
  leftKnee: { x: 0.46, y: 0.68 },
  rightKnee: { x: 0.57, y: 0.69 },
  leftAnkle: { x: 0.44, y: 0.92 },
  rightAnkle: { x: 0.58, y: 0.93 }
};

const top: JointMap = {
  nose: { x: 0.47, y: 0.17 },
  leftShoulder: { x: 0.42, y: 0.3 },
  rightShoulder: { x: 0.58, y: 0.25 },
  leftElbow: { x: 0.39, y: 0.35 },
  rightElbow: { x: 0.55, y: 0.24 },
  leftWrist: { x: 0.34, y: 0.2 },
  rightWrist: { x: 0.44, y: 0.09 },
  leftHip: { x: 0.45, y: 0.49 },
  rightHip: { x: 0.56, y: 0.45 },
  leftKnee: { x: 0.45, y: 0.69 },
  rightKnee: { x: 0.57, y: 0.69 },
  leftAnkle: { x: 0.44, y: 0.92 },
  rightAnkle: { x: 0.58, y: 0.93 }
};

const impact: JointMap = {
  nose: { x: 0.515, y: 0.185 },
  leftShoulder: { x: 0.455, y: 0.315 },
  rightShoulder: { x: 0.595, y: 0.285 },
  leftElbow: { x: 0.475, y: 0.425 },
  rightElbow: { x: 0.57, y: 0.425 },
  leftWrist: { x: 0.49, y: 0.565 },
  rightWrist: { x: 0.555, y: 0.545 },
  leftHip: { x: 0.49, y: 0.5 },
  rightHip: { x: 0.585, y: 0.455 },
  leftKnee: { x: 0.49, y: 0.7 },
  rightKnee: { x: 0.58, y: 0.695 },
  leftAnkle: { x: 0.45, y: 0.92 },
  rightAnkle: { x: 0.59, y: 0.93 }
};

const finish: JointMap = {
  nose: { x: 0.53, y: 0.16 },
  leftShoulder: { x: 0.47, y: 0.24 },
  rightShoulder: { x: 0.59, y: 0.21 },
  leftElbow: { x: 0.44, y: 0.19 },
  rightElbow: { x: 0.52, y: 0.16 },
  leftWrist: { x: 0.39, y: 0.11 },
  rightWrist: { x: 0.48, y: 0.08 },
  leftHip: { x: 0.49, y: 0.44 },
  rightHip: { x: 0.58, y: 0.39 },
  leftKnee: { x: 0.5, y: 0.67 },
  rightKnee: { x: 0.56, y: 0.62 },
  leftAnkle: { x: 0.46, y: 0.92 },
  rightAnkle: { x: 0.55, y: 0.89 }
};

export function createDemoSequence(input: AnalysisInput): PoseFrame[] {
  const totalFrames = 32;
  const duration = input.videoMeta?.durationSec ?? (input.mode === "camera" ? 2.5 : 2.8);
  const backswingFrames = 22;
  const frames: PoseFrame[] = [];

  for (let i = 0; i < totalFrames; i += 1) {
    const t = (duration / (totalFrames - 1)) * i;
    let joints: JointMap;

    if (i <= 4) {
      joints = morph(address, address, 0);
    } else if (i < backswingFrames) {
      joints = morph(address, top, (i - 4) / (backswingFrames - 5));
    } else if (i < 28) {
      joints = morph(top, impact, (i - backswingFrames) / (27 - backswingFrames));
    } else {
      joints = morph(impact, finish, (i - 28) / 3);
    }

    if (input.mode === "screen") {
      joints.nose.x += 0.01;
      joints.rightWrist.x += 0.01;
      joints.rightShoulder.y += 0.01;
    }

    if (input.student?.handicap && input.student.handicap > 20) {
      joints.nose.x += 0.01;
      joints.rightHip.x -= 0.01;
    }

    frames.push(frame(i, t, joints));
  }

  return frames;
}
