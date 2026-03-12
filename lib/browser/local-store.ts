"use client";

import type { AnalysisPayload } from "@/lib/analysis/types";

const reportKey = "steller-local-reports";
const jobKey = "steller-local-jobs";
const studentKey = "steller-local-students";

export function saveLocalReport(payload: AnalysisPayload) {
  const current = getLocalReports();
  const next = [payload, ...current.filter((item) => item.structured.sessionId !== payload.structured.sessionId)].slice(0, 20);
  window.localStorage.setItem(reportKey, JSON.stringify(next));
}

export function getLocalReports(): AnalysisPayload[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(reportKey) || "[]");
  } catch {
    return [];
  }
}

export function getLocalReport(id: string) {
  return getLocalReports().find((item) => item.structured.sessionId === id) ?? null;
}

export function saveLocalJob(job: Record<string, unknown>) {
  const current = getLocalJobs();
  const next = [job, ...current.filter((item) => item.id !== job.id)].slice(0, 20);
  window.localStorage.setItem(jobKey, JSON.stringify(next));
}

export function getLocalJobs(): Record<string, unknown>[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(jobKey) || "[]");
  } catch {
    return [];
  }
}

export function saveLocalStudents(students: Record<string, unknown>[]) {
  window.localStorage.setItem(studentKey, JSON.stringify(students));
}

export function getLocalStudents() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(studentKey) || "[]");
  } catch {
    return [];
  }
}
