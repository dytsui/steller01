import { ReportHero } from "@/components/report/report-hero";
import { ComparisonStrip } from "@/components/report/comparison-strip";
import { IssueCard } from "@/components/report/issue-card";
import { TrainingPlanCard } from "@/components/report/training-plan-card";
import { VideoStudio } from "@/components/video/video-studio";
import { DiagnosticsPanel } from "@/components/video/diagnostics-panel";
import { CompareMatrix } from "@/components/video/compare-matrix";
import { MetricsGrid } from "@/components/report/metrics-grid";
import { EvidenceStrip } from "@/components/report/evidence-strip";
import { ExplainerPanel } from "@/components/report/explainer-panel";
import { ProBenchmarkCard } from "@/components/report/pro-benchmark-card";
import { ShareSheet } from "@/components/report/share-sheet";
import { UpgradeCard } from "@/components/report/upgrade-card";
import { RecommendedVideos } from "@/components/report/recommended-videos";
import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Card } from "@/components/ui/card";

export function ReportDashboard({
  analysis,
  videoUrl
}: {
  analysis: StructuredAnalysis;
  videoUrl?: string | null;
}) {
  return (
    <main className="page stack">
      <ReportHero analysis={analysis} />
      <VideoStudio analysis={analysis} videoUrl={videoUrl} tall preset="capture" />

      <section className="stack">
        <h2 className="section-title">成熟教练产品式结果页闭环</h2>
        <p className="section-subtitle">总分、Tempo、主次问题、叠加骨架、Quick Tip、解释、正确/错误示意、训练入口、推荐视频、历史对比、Pro 对比、升级入口都在同一闭环里。</p>
        <ComparisonStrip analysis={analysis} />
      </section>

      <MetricsGrid analysis={analysis} />
      <EvidenceStrip analysis={analysis} />
      <ExplainerPanel analysis={analysis} />

      <section className="grid-2">
        <div className="stack">
          {analysis.issues.slice(0, 4).map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
          <TrainingPlanCard analysis={analysis} />
          <ProBenchmarkCard analysis={analysis} />
        </div>

        <div className="stack">
          <DiagnosticsPanel analysis={analysis} />
          <CompareMatrix analysis={analysis} />
          <Card>
            <div className="stack">
              <strong>Coach script</strong>
              <div>{analysis.report.coachScript}</div>
            </div>
          </Card>
          <ShareSheet />
        </div>
      </section>

      <RecommendedVideos />
      <UpgradeCard />
    </main>
  );
}
