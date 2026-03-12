import { runAnalysis } from "@/lib/analysis/pipeline";
import { CompareMatrix } from "@/components/video/compare-matrix";
import { Card } from "@/components/ui/card";

export default function ComparePage() {
  const analysis = runAnalysis({
    sessionId: "compare-demo",
    title: "Compare demo",
    mode: "upload",
    swingSide: "right",
    screenMode: false,
    historyMetrics: [{ tempoRatio: 2.6, shoulderTurnTop: 78, hipTurnTop: 34, xFactorTop: 31, spineTiltImpact: 24, headSwayImpactCm: 3.8, finishBalance: 82, screenReadability: 80 }]
  });

  return (
    <main className="page stack">
      <section>
        <span className="kicker">Compare</span>
        <h1 className="section-title">当前 vs 上一杆 vs Pro</h1>
        <p className="section-subtitle">比较页是高级会员和教练工作流会频繁使用的核心页，所以单独预留了路由。</p>
      </section>
      <CompareMatrix analysis={analysis.structured} />
      <Card>
        <div className="stack">
          <strong>Extension notes</strong>
          <div className="muted">后续可以接双视频同步、关键帧并排、骨架叠加、时间轴锁定和 lesson markup。</div>
        </div>
      </Card>
    </main>
  );
}
