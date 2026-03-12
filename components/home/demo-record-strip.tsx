import Link from "next/link";
import records from "@/data/demo/records.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoRecordStrip() {
  return (
    <section className="stack">
      <div>
        <span className="kicker">Demo records</span>
        <h2 className="section-title">历史样例、分层结果、商业闭环入口</h2>
      </div>
      <div className="grid-3">
        {records.slice(0, 6).map((record) => (
          <Card key={record.id}>
            <div className="stack">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <strong>{record.title}</strong>
                  <div className="muted">{record.createdAt}</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Badge tone="mint">Score {record.score}</Badge>
                  <Badge>{record.tempo}</Badge>
                </div>
              </div>
              <div className="muted">Primary: {record.primaryIssue}</div>
              <div className="muted">Secondary: {record.secondaryIssue}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/report/${record.id}`}><Button variant="primary">Open report</Button></Link>
                <Link href={`/records/${record.id}`}><Button>Detail</Button></Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
