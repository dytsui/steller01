"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { runAnalysis } from "@/lib/analysis/pipeline";
import { sampleVideoDiagnostics } from "@/lib/browser/frame-diagnostics";
import type { ScreenDiagnostics } from "@/lib/analysis/types";
import { VideoStudio } from "@/components/video/video-studio";
import { DiagnosticsPanel } from "@/components/video/diagnostics-panel";
import { CaptureControl } from "@/components/capture/capture-control";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [screenMode, setScreenMode] = useState(false);
  const [diagnostics, setDiagnostics] = useState<ScreenDiagnostics | null>(null);
  const [loading, setLoading] = useState(false);

  const preview = useMemo(() => runAnalysis({
    sessionId: "upload-preview",
    title: file?.name || "Upload preview",
    mode: screenMode ? "screen" : "upload",
    swingSide: "right",
    screenMode,
    coachLocale: "zh-CN",
    screenDiagnostics: diagnostics ?? undefined
  }), [file?.name, diagnostics, screenMode]);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0] ?? null;
    setFile(next);
    setPreviewUrl(next ? URL.createObjectURL(next) : null);
    if (!next) return;
    setLoading(true);
    try {
      const sampled = await sampleVideoDiagnostics(next);
      setDiagnostics(sampled);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page capture-page stack">
      <section className="capture-header">
        <div>
          <span className="kicker">Upload / Screen Mode</span>
          <h1 className="section-title">上传分析页 · Video-first</h1>
          <p className="section-subtitle">上传原视频或开启 Screen Mode。先做 readability / confidence，再决定继续分析还是重拍；Gemini 只吃结构化事实，不负责判断动作真相。</p>
        </div>
        <div className="capture-header-actions">
          <Button variant={screenMode ? "primary" : "default"} onClick={() => setScreenMode((current) => !current)}>
            {screenMode ? "Screen Mode ON" : "Screen Mode OFF"}
          </Button>
          {loading ? <span className="badge gold">Sampling frames...</span> : null}
        </div>
      </section>

      <VideoStudio analysis={preview.structured} videoUrl={previewUrl} tall preset="capture" />

      <div className="capture-footer-grid capture-footer-grid--wide">
        <Card>
          <div className="stack">
            <div className="field">
              <label>Choose video / 选择视频</label>
              <input type="file" accept="video/*" onChange={handleFile} />
            </div>
            <div className="muted">支持：屏幕边框置信度、反光比、带纹分数、角度惩罚、人物大小估计。质量过差时，不硬分析，明确提示用户重拍。</div>
          </div>
        </Card>
        <CaptureControl mode={screenMode ? "screen" : "upload"} diagnostics={diagnostics} file={file} onPreviewUrl={setPreviewUrl} />
        <DiagnosticsPanel analysis={preview.structured} />
      </div>
    </main>
  );
}
