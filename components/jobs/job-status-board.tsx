import Link from "next/link";
import type { DemoJob } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { fmtDate } from "@/lib/utils";

export function JobStatusBoard({ jobs }: { jobs: DemoJob[] }) {
  return (
    <div className="jobs-board">
      {jobs.map((job) => (
        <Card key={job.id}>
          <div className="job-row">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <strong>{job.videoLabel}</strong>
                <div className="muted">{job.id} · {fmtDate(job.createdAt)}</div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Badge tone={job.status === "completed" ? "mint" : job.status === "processing" ? "gold" : job.status === "failed" ? "danger" : undefined}>{job.status}</Badge>
                {job.screenMode ? <Badge>Screen</Badge> : <Badge>{job.mode}</Badge>}
              </div>
            </div>
            <ProgressBar value={job.progress} />
            <div className="muted">Task coordination path: upload → queue → job room → structured analysis → report payload.</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/jobs/${job.id}`}><Button variant="primary">Open job detail</Button></Link>
              {job.recordId ? <Link href={`/report/${job.recordId}`}><Button>Open report</Button></Link> : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
