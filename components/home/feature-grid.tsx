import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Trusted analysis pipeline",
    body: "Video decoding → Screen Mode preprocessing → phase engine → tempo / kinematics → issue rules → score → structured JSON → Gemini copy layer."
  },
  {
    title: "Video-first product feel",
    body: "Capture and Upload pages keep the main stage at roughly 70–80% of the viewport so the player, skeleton, guide lines, HUD, and keyframe timeline dominate the experience."
  },
  {
    title: "Screen Mode diagnostics",
    body: "Readability score, glare ratio, angle penalty, banding, border confidence, and subject scale all sit in the same chain and can block low-trust analysis."
  },
  {
    title: "Commercial result page loop",
    body: "Score, Tempo, primary issue, secondary issue, quick tip, explanation, good vs bad cues, training entry, recommended video, share copy, and upgrade card in one flow."
  },
  {
    title: "Cloudflare-first operations",
    body: "Workers, D1, R2, Queues, and Durable Objects are pre-wired so GitHub-to-Cloudflare deployment can stay simple while heavier Python analysis remains pluggable."
  },
  {
    title: "Coach and academy ready",
    body: "Students, records, training blocks, jobs, and premium plan hooks are already carved into the repository so future member, billing, and coach dashboards can land cleanly."
  }
];

export function FeatureGrid() {
  return (
    <section className="grid-3">
      {features.map((feature) => (
        <Card key={feature.title}>
          <div className="stack">
            <strong>{feature.title}</strong>
            <div className="muted">{feature.body}</div>
          </div>
        </Card>
      ))}
    </section>
  );
}
