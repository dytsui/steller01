import Link from "next/link";
import records from "@/data/demo/records.json";
import recommendedVideos from "@/data/demo/recommended-videos.json";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function RecordDetail({ recordId }: { recordId: string }) {
  const record = records.find((item) => item.id === recordId) ?? records[0];
  const videos = recommendedVideos.slice(0, 4);

  return (
    <div className="stack">
      <Card className="hero">
        <div className="stack">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <span className="kicker">Session detail</span>
              <h1 className="section-title">{record.title}</h1>
              <p className="section-subtitle">在学员详情、训练计划、分享导出和周报模块之间，这是单次挥杆最清楚的中枢页面。</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge tone="mint">Score {record.score}</Badge>
              <Badge>{record.tempo}</Badge>
              {record.screenMode ? <Badge tone="gold">Screen Mode</Badge> : null}
            </div>
          </div>
          <div className="metric-grid metric-grid--three">
            <div className="metric-item"><span className="metric-label">Primary</span><strong>{record.primaryIssue}</strong></div>
            <div className="metric-item"><span className="metric-label">Secondary</span><strong>{record.secondaryIssue}</strong></div>
            <div className="metric-item"><span className="metric-label">Captured</span><strong>{record.createdAt}</strong></div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href={`/report/${record.id}`}><Button variant="primary">Open full report</Button></Link>
            <Link href="/training"><Button>Open training</Button></Link>
          </div>
        </div>
      </Card>

      <section className="grid-2">
        <Card>
          <div className="stack">
            <strong>Why this record matters</strong>
            <div className="muted">把单杆的分析、建议、回放、训练闭环留住，后续才能做真正的成长曲线、教练点评和会员价值感。</div>
            {[
              "Address / Top / Impact / Finish 关键相位和时间戳保存",
              "主问题与次问题都保留证据文本和 quick tip",
              "训练建议与推荐视频从结构化 issue IDs 映射，而不是 AI 瞎编"
            ].map((item) => <div className="stat-card" key={item}>{item}</div>)}
          </div>
        </Card>

        <Card>
          <div className="stack">
            <strong>Recommended next actions</strong>
            {videos.map((video) => (
              <div className="stat-card" key={video.id}>
                <strong>{video.title}</strong>
                <div className="muted">{video.duration} · {video.focus}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
