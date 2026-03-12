import type { StructuredAnalysis } from "@/lib/analysis/types";

export function KeyframeRail({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <div className="keyframe-rail">
      {analysis.phases.map((phase) => (
        <div key={phase.label} className="keyframe-pill">
          <span>{phase.label}</span>
          <strong>{phase.t.toFixed(2)}s</strong>
        </div>
      ))}
    </div>
  );
}
