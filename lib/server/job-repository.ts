import jobs from "@/data/demo/jobs.json";
import type { DemoJob } from "@/lib/types";

export function listDemoJobs() {
  return jobs as DemoJob[];
}

export function getDemoJobById(jobId: string) {
  return (jobs as DemoJob[]).find((item) => item.id === jobId) ?? null;
}
