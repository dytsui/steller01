import type { AnalysisJobEnvelope } from "./types";

export async function createAnalysisEnvelope(partial: Partial<AnalysisJobEnvelope>): Promise<AnalysisJobEnvelope> {
  return {
    jobId: partial.jobId || `job-${Date.now()}`,
    sessionId: partial.sessionId || `session-${Date.now()}`,
    mode: partial.mode || "upload",
    screenMode: partial.screenMode || false,
    sourceKey: partial.sourceKey,
    createdAt: new Date().toISOString()
  };
}

export async function forwardToExternalAnalysis(payload: unknown, endpoint?: string, token?: string) {
  if (!endpoint) {
    return { ok: false, reason: "No external analysis endpoint configured." };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });

  return {
    ok: response.ok,
    status: response.status,
    body: await response.text()
  };
}
