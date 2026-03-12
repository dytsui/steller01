import { TrainingLibrary } from "@/components/training/training-library";
import { TrainingWeekPlan } from "@/components/training/training-week-plan";
import { runAnalysis } from "@/lib/analysis/pipeline";

export default function TrainingPage() {
  const analysis = runAnalysis({
    sessionId: "training-demo",
    title: "Training demo",
    mode: "upload",
    swingSide: "right",
    screenMode: false,
    historyMetrics: [{ tempoRatio: 2.7, shoulderTurnTop: 79, hipTurnTop: 35, xFactorTop: 33, spineTiltImpact: 25, headSwayImpactCm: 3.4, finishBalance: 86, screenReadability: 85 }]
  });

  return (
    <main className="page stack">
      <section>
        <span className="kicker">Training / 训练页</span>
        <h1 className="section-title">训练计划、周计划、推荐内容</h1>
        <p className="section-subtitle">训练计划严格基于已识别的问题，不允许 Gemini 在没有动作证据时胡乱下结论。文案可以润色，事实不能越界。</p>
      </section>
      <section className="grid-2">
        <TrainingLibrary analysis={analysis.structured} />
        <TrainingWeekPlan />
      </section>
    </main>
  );
}
