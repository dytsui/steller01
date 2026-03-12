export type Locale = "en" | "zh-CN";

export type DemoRecord = {
  id: string;
  studentId: string;
  title: string;
  createdAt: string;
  score: number;
  tempo: string;
  primaryIssue: string;
  secondaryIssue: string;
  mode: "camera" | "upload" | "screen";
  screenMode: boolean;
};

export type DemoStudent = {
  id: string;
  name: string;
  level: string;
  handicap: number;
  dominantHand: "left" | "right";
  lastScore: number;
  lastIssue: string;
  avatar: string;
};

export type DemoJob = {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  mode: "camera" | "upload" | "screen";
  createdAt: string;
  videoLabel: string;
  progress: number;
  screenMode: boolean;
  recordId: string | null;
};
