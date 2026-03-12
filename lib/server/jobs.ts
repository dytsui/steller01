import { getDemoJobs } from "@/lib/server/demo-data";

export function findJob(id: string) {
  return getDemoJobs().find((job) => job.id === id) ?? null;
}
