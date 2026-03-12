import drills from "@/data/demo/drills.json";
import { Card } from "@/components/ui/card";
import { DrillCard } from "@/components/training/drill-card";
import type { StructuredAnalysis } from "@/lib/analysis/types";

export function TrainingLibrary({ analysis }: { analysis: StructuredAnalysis }) {
  return (
    <div className="stack">
      <div className="grid-2">
        {analysis.trainingPlan.map((item) => (
          <DrillCard key={item.title} title={item.title} focus={item.focus} reps={item.reps} cue={item.cue} />
        ))}
        <Card>
          <div className="stack">
            <strong>Recommended content slot</strong>
            <div className="muted">Reserved for premium library / coach video / paid plan upsell.</div>
            <div className="stat-card">Use the same issue IDs from structured JSON to map drills, reels, and coach lesson bundles.</div>
          </div>
        </Card>
      </div>
      <Card>
        <div className="stack">
          <strong>Issue-mapped drill bank</strong>
          <div className="grid-2">
            {drills.slice(0, 6).map((drill) => (
              <div className="stat-card" key={drill.id}>
                <strong>{drill.title}</strong>
                <div className="muted">{drill.focus} · {drill.reps}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
