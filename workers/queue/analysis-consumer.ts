import type { AnalysisJobEnvelope, JobProgressState } from "../types";

export async function consumeAnalysisJob(envelope: AnalysisJobEnvelope): Promise<JobProgressState[]> {
  const now = new Date().toISOString();
  return [
    { jobId: envelope.jobId, status: "queued", progress: 10, message: "Job accepted by queue", updatedAt: now },
    { jobId: envelope.jobId, status: "processing", progress: 45, message: "Running structured analysis", updatedAt: now },
    { jobId: envelope.jobId, status: "processing", progress: 78, message: "Generating coach copy from structured facts", updatedAt: now },
    { jobId: envelope.jobId, status: "completed", progress: 100, message: "Report payload ready for D1 / R2 write-back", updatedAt: now }
  ];
}
