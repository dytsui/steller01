import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

const metrics: Array<[keyof StructuredAnalysis["metrics"], string, string]> = [
  ["shoulderTurnTop", "Shoulder turn @ Top", "°"],
  ["hipTurnTop", "Hip turn @ Top", "°"],
  ["xFactorTop", "X-Factor @ Top", "°"],
  ["spineTiltImpact", "Spine tilt @ Impact", "°"],
  ["headSwayImpactCm", "Head sway @ Impact", "cm"],
  ["finishBalance", "Finish balance", ""]
];

export function MetricsGrid({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <section className="grid-3">
      {metrics.map(([key, label, suffix]) => (
        <Card key={key}>
          <div className="stack">
            <span className="metric-label">{label}</span>
            <div className="metric-value">{analysis.metrics[key]}{suffix}</div>
            <div className="muted">可信分析层直接产出，不由 Gemini 生成。</div>
          </div>
        </Card>
      ))}
    </section>
  );
}
