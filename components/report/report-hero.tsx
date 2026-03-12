import { ArrowRight, Gauge, MonitorPlay, Sparkles } from "lucide-react";
import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";

export function ReportHero({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <div className="report-hero">
      <Card className="hero">
        <div className="stack">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Badge tone="mint">可信分析 JSON</Badge>
            <Badge tone="gold">Coach report last</Badge>
            <Badge>{analysis.reportMeta.source === "gemini" ? `Gemini copy · ${analysis.reportMeta.model}` : "Rules-based coach copy"}</Badge>
            {analysis.mode === "screen" ? <Badge>Screen Mode</Badge> : null}
          </div>
          <h1 style={{ margin: 0, fontSize: "2rem" }}>{analysis.report.headline}</h1>
          <p className="muted" style={{ margin: 0 }}>{analysis.report.summary}</p>
          <div className="stats-row">
            <div className="stat-card">
              <div className="muted">Primary issue</div>
              <div className="value" style={{ fontSize: "1.15rem" }}>{analysis.issues[0]?.label ?? "None"}</div>
            </div>
            <div className="stat-card">
              <div className="muted">Quick tip</div>
              <div>{analysis.report.quickTip}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="primary"><Sparkles size={16} /> 3-second quick tip</Button>
            <Button><Gauge size={16} /> Pro comparison</Button>
            <Button><MonitorPlay size={16} /> Recommended video</Button>
            <Button><ArrowRight size={16} /> Upgrade plan entry</Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="stack">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <strong>Total score</strong>
            <ScoreRing score={analysis.score.total} />
          </div>
          {Object.entries(analysis.score.subscores).map(([key, value]) => (
            <div key={key} className="stat-card">
              <div className="muted">{key}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
