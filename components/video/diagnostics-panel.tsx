import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

export function DiagnosticsPanel({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <Card>
      <div className="stack">
        <strong>Screen Mode diagnostics</strong>
        <div className="metric-grid metric-grid--three">
          <div className="metric-item"><span className="metric-label">Readability</span><strong>{analysis.screen.readabilityScore}</strong></div>
          <div className="metric-item"><span className="metric-label">Screen confidence</span><strong>{analysis.screen.screenConfidence}</strong></div>
          <div className="metric-item"><span className="metric-label">Border confidence</span><strong>{analysis.screen.borderConfidence}</strong></div>
        </div>
        <div className="metric-grid metric-grid--three">
          <div className="metric-item"><span className="metric-label">Glare</span><strong>{Math.round(analysis.screen.glareRatio * 100)}%</strong></div>
          <div className="metric-item"><span className="metric-label">Subject scale</span><strong>{Math.round(analysis.screen.subjectScale * 100)}%</strong></div>
          <div className="metric-item"><span className="metric-label">Banding</span><strong>{analysis.screen.bandingScore}</strong></div>
        </div>
        {analysis.warnings.length ? (
          <div className="stack">
            {analysis.warnings.map((warning) => <div className="stat-card" key={warning}>{warning}</div>)}
          </div>
        ) : (
          <div className="muted">No re-shoot prompts on this sample.</div>
        )}
      </div>
    </Card>
  );
}
