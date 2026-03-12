import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

export function CompareMatrix({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <Card>
      <div className="stack">
        <strong>Compare matrix</strong>
        <div className="metric-grid metric-grid--three">
          <div className="metric-item">
            <span className="metric-label">Current vs Previous tempo</span>
            <strong>{analysis.comparison.vsHistory.tempoRatio.delta > 0 ? "+" : ""}{analysis.comparison.vsHistory.tempoRatio.delta}</strong>
          </div>
          <div className="metric-item">
            <span className="metric-label">Current vs Pro X-Factor</span>
            <strong>{analysis.comparison.vsPro.xFactorTop.delta > 0 ? "+" : ""}{analysis.comparison.vsPro.xFactorTop.delta}</strong>
          </div>
          <div className="metric-item">
            <span className="metric-label">Current vs Pro spine tilt</span>
            <strong>{analysis.comparison.vsPro.spineTiltImpact.delta > 0 ? "+" : ""}{analysis.comparison.vsPro.spineTiltImpact.delta}</strong>
          </div>
        </div>
      </div>
    </Card>
  );
}
