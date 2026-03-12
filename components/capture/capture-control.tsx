"use client";

import { Camera, LoaderCircle, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { uid } from "@/lib/utils";
import { saveLocalJob, saveLocalReport } from "@/lib/browser/local-store";
import type { AnalysisPayload, ScreenDiagnostics } from "@/lib/analysis/types";

type StudioMode = "camera" | "upload" | "screen";

async function postAnalyze(body: unknown): Promise<AnalysisPayload> {
  const response = await fetch("/api/analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error("Analysis request failed");
  return response.json();
}

export function CaptureControl({
  mode,
  diagnostics,
  file,
  onPreviewUrl
}: {
  mode: StudioMode;
  diagnostics?: ScreenDiagnostics | null;
  file?: File | null;
  onPreviewUrl?: (url: string | null) => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  const label = useMemo(() => (
    mode === "camera" ? "Analyze captured swing" :
    mode === "screen" ? "Analyze screen capture" :
    "Analyze uploaded video"
  ), [mode]);

  async function run() {
    setBusy(true);
    try {
      const sessionId = uid("swing");
      const payload = await postAnalyze({
        sessionId,
        title: file?.name || `${mode} session`,
        mode,
        swingSide: "right",
        screenMode: mode === "screen",
        coachLocale: "zh-CN",
        screenDiagnostics: diagnostics,
        videoMeta: {
          durationSec: 2.7,
          sourceLabel: file?.name || `${mode} session`
        },
        student: { name: "Demo Student", handicap: 18 }
      });

      saveLocalReport(payload);
      saveLocalJob({
        id: `job-${sessionId}`,
        status: "completed",
        mode,
        createdAt: new Date().toISOString(),
        progress: 100,
        screenMode: mode === "screen",
        videoLabel: file?.name || `${mode} session`,
        recordId: sessionId,
        reportSource: payload.structured.reportMeta.source
      });

      router.push(`/report/${sessionId}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <div className="stack">
        <strong>{label}</strong>
        <div className="muted">先跑结构化可信分析，再由 Gemini 2.5 Flash-Lite 可选润色教练话术；没有 API Key 时自动回退到本地规则报告。</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="primary" onClick={run} disabled={busy}>
            {busy ? <LoaderCircle size={16} className="spin" /> : <Camera size={16} />}
            {busy ? "Analyzing..." : label}
          </Button>
          <Button onClick={() => inputRef.current?.click()}>
            <UploadCloud size={16} /> Replace video
          </Button>
          <input
            ref={inputRef}
            hidden
            type="file"
            accept="video/*"
            onChange={(event) => {
              const next = event.target.files?.[0];
              onPreviewUrl?.(next ? URL.createObjectURL(next) : null);
            }}
          />
        </div>
      </div>
    </Card>
  );
}
