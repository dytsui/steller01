import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

export function ExplainerPanel({ analysis }: { analysis: StructuredAnalysis }) {
  const primary = analysis.issues[0];
  const secondary = analysis.issues[1];

  return (
    <section className="grid-2">
      <Card>
        <div className="stack">
          <span className="kicker">Problem explainer</span>
          <h3 style={{ margin: 0 }}>{primary?.label ?? "No major issue"}</h3>
          <div className="muted">{primary?.coachingNote ?? "Good sequencing and stable strike windows."}</div>
          <div className="stat-card">
            <strong>Quick tip</strong>
            <div>{primary?.quickTip ?? analysis.report.quickTip}</div>
          </div>
          <div className="metric-grid metric-grid--two">
            <div className="metric-item">
              <span className="metric-label">Do</span>
              <strong>Keep the chest turning while the head box stays quiet.</strong>
            </div>
            <div className="metric-item">
              <span className="metric-label">Avoid</span>
              <strong>Driving the head or upper body toward the ball at impact.</strong>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="stack">
          <span className="kicker">Secondary pattern</span>
          <h3 style={{ margin: 0 }}>{secondary?.label ?? "Secondary pattern clean"}</h3>
          <div className="muted">{secondary?.coachingNote ?? "No secondary fault crossed the confidence threshold."}</div>
          <div className="metric-grid metric-grid--two">
            <div className="metric-item">
              <span className="metric-label">Good move</span>
              <strong>{analysis.report.goodPoints[0] ?? "Stable finish and centered contact."}</strong>
            </div>
            <div className="metric-item">
              <span className="metric-label">Next priority</span>
              <strong>{analysis.report.priorities[0] ?? "Re-shoot from face-on and down-the-line."}</strong>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
