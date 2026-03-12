export type JointName =
  | "nose"
  | "leftShoulder"
  | "rightShoulder"
  | "leftElbow"
  | "rightElbow"
  | "leftWrist"
  | "rightWrist"
  | "leftHip"
  | "rightHip"
  | "leftKnee"
  | "rightKnee"
  | "leftAnkle"
  | "rightAnkle";

export type Point = {
  x: number;
  y: number;
  z?: number;
  confidence?: number;
};

export type PoseFrame = {
  index: number;
  t: number;
  joints: Record<JointName, Point>;
};

export type ScreenDiagnostics = {
  brightnessMean: number;
  contrast: number;
  glareRatio: number;
  edgeDensity: number;
  borderConfidence: number;
  subjectScale: number;
  anglePenalty: number;
  bandingScore: number;
  readabilityScore?: number;
  screenConfidence?: number;
  warnings?: string[];
};

export type AnalysisInput = {
  sessionId: string;
  title?: string;
  mode: "camera" | "upload" | "screen";
  swingSide: "left" | "right";
  screenMode: boolean;
  coachLocale?: "en" | "zh-CN";
  screenDiagnostics?: ScreenDiagnostics;
  landmarkFrames?: PoseFrame[];
  historyMetrics?: Partial<MetricSnapshot>[];
  student?: {
    id?: string;
    name?: string;
    handicap?: number;
  };
  videoMeta?: {
    durationSec?: number;
    frameCount?: number;
    width?: number;
    height?: number;
    sourceLabel?: string;
  };
};

export type PhaseDetection = {
  label: "Address" | "Top" | "Impact" | "Finish";
  frameIndex: number;
  confidence: number;
  t: number;
};

export type MetricSnapshot = {
  shoulderTurnTop: number;
  hipTurnTop: number;
  xFactorTop: number;
  spineTiltAddress: number;
  spineTiltImpact: number;
  headSwayImpactCm: number;
  wristArcHeight: number;
  finishBalance: number;
  tempoRatio: number;
  backswingSec: number;
  downswingSec: number;
  screenReadability: number;
  screenConfidence: number;
};

export type IssueDetection = {
  id: string;
  label: string;
  severity: "minor" | "moderate" | "major";
  confidence: number;
  evidence: string;
  quickTip: string;
  coachingNote: string;
};

export type ComparisonResult = {
  vsPro: Record<string, { current: number; target: number; delta: number }>;
  vsHistory: Record<string, { current: number; previous: number; delta: number }>;
};

export type StructuredAnalysis = {
  sessionId: string;
  title: string;
  mode: AnalysisInput["mode"];
  phases: PhaseDetection[];
  metrics: MetricSnapshot;
  issues: IssueDetection[];
  screen: Required<ScreenDiagnostics>;
  score: {
    total: number;
    subscores: Record<string, number>;
  };
  comparison: ComparisonResult;
  overlays: {
    ghostTrail: Point[];
    spineLine: [Point, Point];
    shoulderLine: [Point, Point];
    hipLine: [Point, Point];
    headBox: { x: number; y: number; width: number; height: number };
  };
  report: {
    headline: string;
    summary: string;
    quickTip: string;
    goodPoints: string[];
    priorities: string[];
    coachScript: string;
  };
  reportMeta: {
    source: "rules" | "gemini";
    model?: string;
    generatedAt: string;
    locale: "en" | "zh-CN";
  };
  trainingPlan: Array<{
    title: string;
    focus: string;
    reps: string;
    cue: string;
  }>;
  warnings: string[];
};

export type AnalysisPayload = {
  structured: StructuredAnalysis;
  llmReadyPayload: {
    facts: Record<string, string | number | string[]>;
    guardrail: string;
  };
};
