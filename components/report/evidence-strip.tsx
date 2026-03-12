import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

export function EvidenceStrip({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <section className="grid-2">
      <Card>
        <div className="stack">
          <strong>Phase evidence</strong>
          {analysis.phases.map((phase) => (
            <div key={phase.label} className="metric-item">
              <span className="metric-label">{phase.label}</span>
              <strong>frame {phase.frameIndex} · {phase.t.toFixed(2)}s · conf {Math.round(phase.confidence * 100)}%</strong>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="stack">
          <strong>Issue evidence</strong>
          {analysis.issues.slice(0, 4).map((issue) => (
            <div key={issue.id} className="stat-card">
              <strong>{issue.label}</strong>
              <div className="muted">{issue.evidence}</div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
