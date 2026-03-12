import proStandards from "@/data/demo/pro-standards.json";
import { Card } from "@/components/ui/card";

export default function ProPage() {
  return (
    <main className="page stack">
      <section>
        <span className="kicker">Pro reference</span>
        <h1 className="section-title">职业模板与标准带</h1>
        <p className="section-subtitle">职业标准不一定是唯一正确动作，但它是对比、评分和教学目标设定的重要基线。</p>
      </section>
      <div className="grid-3">
        {Object.entries(proStandards).map(([key, value]) => (
          <Card key={key}>
            <div className="stack">
              <span className="metric-label">{key}</span>
              <div className="metric-value">{String(value)}</div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
