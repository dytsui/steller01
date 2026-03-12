import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

export function TrainingPlanCard({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <Card>
      <div className="stack">
        <div>
          <strong>Training block</strong>
          <p className="muted">Generated only after structured analysis and issue prioritization.</p>
        </div>
        {analysis.trainingPlan.map((item) => (
          <div key={item.title} className="stat-card">
            <strong>{item.title}</strong>
            <div className="muted">{item.focus} · {item.reps}</div>
            <div>{item.cue}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
