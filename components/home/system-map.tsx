import { Card } from "@/components/ui/card";

const layers = [
  ["Input", "Camera capture, upload, Screen Mode, jobs queue creation"],
  ["Trust layer", "Readability gate, phase engine, tempo engine, kinematics engine, issue rules, score engine"],
  ["Payload", "Structured analysis JSON, evidence text, screen warnings, training blocks, compare payload"],
  ["AI copy", "Gemini only refines headline, summary, quick tip, coach script, and share captions"],
  ["Commercial loop", "Result page, training entry, recommended videos, records, students, premium plan, social share"]
];

export function SystemMap() {
  return (
    <section className="grid-5">
      {layers.map(([title, body]) => (
        <Card key={title}>
          <div className="stack">
            <div className="metric-label">{title}</div>
            <strong>{body}</strong>
          </div>
        </Card>
      ))}
    </section>
  );
}
