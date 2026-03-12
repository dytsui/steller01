import jobsData from "@/data/demo/jobs.json";
import { JobStatusBoard, type DemoJob } from "@/components/jobs/job-status-board";
import { Card } from "@/components/ui/card";

const jobs: DemoJob[] = jobsData as DemoJob[];

export default function JobsPage() {
  return (
    <main className="page stack">
      <section>
        <span className="kicker">Jobs / 分析任务状态页</span>
        <h1 className="section-title">分析任务状态、协调链路、故障排查入口</h1>
        <p className="section-subtitle">
          Queue / Durable Object 的思路不是只写进文档，而是把 detail 页面和数据流入口一并留好。
        </p>
      </section>

      <Card>
        <div className="stack">
          <strong>Operational note</strong>
          <div className="muted">
            这页负责让你以后快速看：哪些任务卡住、哪些 Screen Mode 质量太差、哪些回写报告成功。
          </div>
        </div>
      </Card>

      <JobStatusBoard jobs={jobs} />
    </main>
  );
}
