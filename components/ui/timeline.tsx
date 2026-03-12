import type { PhaseDetection } from "@/lib/analysis/types";
import { cn } from "@/lib/utils";

export function Timeline({
  phases,
  active
}: {
  phases: PhaseDetection[];
  active?: string;
}) {
  return (
    <div className="timeline">
      {phases.map((phase) => (
        <div key={phase.label} className={cn("timeline-chip", active === phase.label && "active")}>
          {phase.label} · {phase.t.toFixed(2)}s
        </div>
      ))}
    </div>
  );
}
