import { Card } from "@/components/ui/card";

export function DrillCard({
  title,
  focus,
  reps,
  cue
}: {
  title: string;
  focus: string;
  reps: string;
  cue: string;
}) {
  return (
    <Card>
      <div className="stack">
        <strong>{title}</strong>
        <div className="muted">{focus}</div>
        <div>{reps}</div>
        <div className="stat-card">{cue}</div>
      </div>
    </Card>
  );
}
