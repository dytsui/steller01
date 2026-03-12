export type AnalysisJobEnvelope = {
  jobId: string;
  sessionId: string;
  mode: "camera" | "upload" | "screen";
  screenMode: boolean;
  sourceKey?: string;
  createdAt: string;
};

export type JobProgressState = {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  message: string;
  updatedAt: string;
};
