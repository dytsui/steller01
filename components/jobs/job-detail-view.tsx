import jobs from "@/data/demo/jobs.json";
import records from "@/data/demo/records.json";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function JobDetailView({ jobId }: { jobId: string }) {
  const job = jobs.find((item) => item.id === jobId) ?? jobs[0];
  const record = records.find((item) => item.id === job.recordId) ?? null;

  return (
    <div className="stack">
      <Card className="hero">
        <div className="stack">
          <span className="kicker">Job detail</span>
          <h1 className="section-title">{job.videoLabel}</h1>
          <div className="section-subtitle">Cloudflare Queue / Durable Object / structured analysis / report write-back 的协调详情入口。</div>
          <ProgressBar value={job.progress} />
        </div>
      </Card>

      <section className="grid-2">
        <Card>
          <div className="stack">
            <strong>Pipeline trace</strong>
            {[
              "1. Upload or capture created a job envelope",
              "2. Queue consumer validated source and screen diagnostics",
              "3. Analysis layer produced structured JSON",
              "4. Gemini copy layer refined coach language only",
              "5. Report payload and training blocks were written back"
            ].map((item) => <div key={item} className="stat-card">{item}</div>)}
          </div>
        </Card>
        <Card>
          <div className="stack">
            <strong>Output linkage</strong>
            {record ? (
              <div className="stat-card">
                <strong>{record.title}</strong>
                <div className="muted">Score {record.score} · {record.primaryIssue}</div>
              </div>
            ) : <div className="muted">No report linked yet.</div>}
            <div className="muted">Current status: {job.status}. This page is where retries, queue dead-letter handling, and support diagnostics can expand later.</div>
          </div>
        </Card>
      </section>
    </div>
  );
}
