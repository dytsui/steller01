"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { ReportDashboard } from "@/components/report/report-dashboard";
import { getLocalReport } from "@/lib/browser/local-store";
import { runAnalysis } from "@/lib/analysis/pipeline";

export default function ReportPage() {
  const params = useParams<{ id: string }>();
  const resolvedId = params?.id ?? "demo-home";

  const payload = useMemo(() => {
    const local = getLocalReport(resolvedId);
    if (local) return local;
    return runAnalysis({
      sessionId: resolvedId,
      title: resolvedId.includes("demo-") ? "Demo report" : `Session ${resolvedId}`,
      mode: resolvedId.includes("002") || resolvedId.includes("screen") ? "screen" : "upload",
      swingSide: "right",
      screenMode: resolvedId.includes("002") || resolvedId.includes("screen"),
      historyMetrics: [{ tempoRatio: 2.7, shoulderTurnTop: 79, hipTurnTop: 35, xFactorTop: 33, spineTiltImpact: 25, headSwayImpactCm: 3.4, finishBalance: 86, screenReadability: 85 }]
    });
  }, [resolvedId]);

  return <ReportDashboard analysis={payload.structured} />;
}
