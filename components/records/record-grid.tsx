import Link from "next/link";
import type { DemoRecord } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RecordGrid({ records }: { records: DemoRecord[] }) {
  return (
    <div className="grid-3">
      {records.map((record) => (
        <Card key={record.id}>
          <div className="stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <strong>{record.title}</strong>
                <div className="muted">{record.createdAt}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge tone="mint">Score {record.score}</Badge>
                {record.screenMode ? <Badge tone="gold">Screen</Badge> : <Badge>{record.mode}</Badge>}
              </div>
            </div>
            <div className="metric-grid metric-grid--two">
              <div className="metric-item">
                <span className="metric-label">Tempo</span>
                <strong>{record.tempo}</strong>
              </div>
              <div className="metric-item">
                <span className="metric-label">Primary issue</span>
                <strong>{record.primaryIssue}</strong>
              </div>
            </div>
            <div className="muted">Secondary issue: {record.secondaryIssue}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/report/${record.id}`}><Button variant="primary">Open report</Button></Link>
              <Link href={`/records/${record.id}`}><Button>Session detail</Button></Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
