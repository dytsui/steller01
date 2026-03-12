import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

const keys = [
  ["tempoRatio", "Tempo ratio"],
  ["xFactorTop", "X-Factor top"],
  ["spineTiltImpact", "Impact spine tilt"],
  ["finishBalance", "Finish balance"]
] as const;

export function ProBenchmarkCard({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <Card>
      <div className="stack">
        <strong>Current vs Pro benchmark</strong>
        {keys.map(([key, label]) => {
          const row = analysis.comparison.vsPro[key];
          return (
            <div key={key} className="metric-grid metric-grid--three">
              <div className="metric-item"><span className="metric-label">{label}</span><strong>{row.current}</strong></div>
              <div className="metric-item"><span className="metric-label">Target</span><strong>{row.target}</strong></div>
              <div className="metric-item"><span className="metric-label">Gap</span><strong>{row.delta > 0 ? "+" : ""}{row.delta}</strong></div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
