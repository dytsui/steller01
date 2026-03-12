import recommendedVideos from "@/data/demo/recommended-videos.json";
import { Card } from "@/components/ui/card";

export function RecommendedVideos() {
  return (
    <section className="grid-2">
      {recommendedVideos.slice(0, 4).map((item) => (
        <Card key={item.id}>
          <div className="stack">
            <strong>{item.title}</strong>
            <div className="muted">{item.duration} · {item.focus}</div>
            <div className="stat-card">{item.description}</div>
          </div>
        </Card>
      ))}
    </section>
  );
}
