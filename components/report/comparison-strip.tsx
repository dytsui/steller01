import type { StructuredAnalysis } from "@/lib/analysis/types";

const keys = ["shoulderTurnTop", "hipTurnTop", "xFactorTop", "tempoRatio"] as const;

export function ComparisonStrip({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <div className="compare-strip">
      {keys.map((key) => {
        const pro = analysis.comparison.vsPro[key];
        const history = analysis.comparison.vsHistory[key];
        return (
          <div className="compare-item" key={key}>
            <div className="muted">{key}</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{pro.current}</div>
            <div className="muted">Pro target {pro.target} · Δ {pro.delta > 0 ? "+" : ""}{pro.delta}</div>
            <div className="muted">History {history.previous} · Δ {history.delta > 0 ? "+" : ""}{history.delta}</div>
          </div>
        );
      })}
    </div>
  );
}
