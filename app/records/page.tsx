"use client";

import { useEffect, useState } from "react";
import seedRecords from "@/data/demo/records.json";
import { getLocalReports } from "@/lib/browser/local-store";
import { RecordGrid } from "@/components/records/record-grid";
import type { DemoRecord } from "@/lib/types";

export default function RecordsPage() {
  const [records, setRecords] = useState<DemoRecord[]>(seedRecords as DemoRecord[]);

  useEffect(() => {
    const local = getLocalReports().map((item) => ({
      id: item.structured.sessionId,
      studentId: "local-student",
      title: item.structured.title,
      createdAt: new Date().toISOString(),
      score: item.structured.score.total,
      tempo: `${item.structured.metrics.tempoRatio}:1`,
      primaryIssue: item.structured.issues[0]?.label ?? "None",
      secondaryIssue: item.structured.issues[1]?.label ?? "None",
      mode: item.structured.mode,
      screenMode: item.structured.mode === "screen"
    })) as DemoRecord[];
    setRecords([...local, ...(seedRecords as DemoRecord[])]);
  }, []);

  return (
    <main className="page stack">
      <section>
        <span className="kicker">Records / 历史记录页</span>
        <h1 className="section-title">历史记录、趋势入口、单杆详情</h1>
        <p className="section-subtitle">这里不再只是简单卡片列表，而是为单杆详情、成长趋势、周报月报、学员管理做准备的厚页面。</p>
      </section>
      <RecordGrid records={records} />
    </main>
  );
}
