"use client";

import { Camera, Circle, Square } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { runAnalysis } from "@/lib/analysis/pipeline";
import { VideoStudio } from "@/components/video/video-studio";
import { CaptureControl } from "@/components/capture/capture-control";
import { CompareMatrix } from "@/components/video/compare-matrix";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CapturePage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const previewAnalysis = useMemo(() => runAnalysis({
    sessionId: "capture-preview",
    title: "Live camera preview",
    mode: "camera",
    swingSide: "right",
    screenMode: false,
    coachLocale: "zh-CN"
  }), []);

  async function startPreview() {
    const next = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });
    setStream(next);
  }

  function stopPreview() {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
  }

  function startRecording() {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setPreviewUrl(URL.createObjectURL(blob));
      setRecording(false);
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  return (
    <main className="page capture-page stack">
      <section className="capture-header">
        <div>
          <span className="kicker">Capture Studio · 拍摄页</span>
          <h1 className="section-title">GolfFix 级 Video-first 实时拍摄工作台</h1>
          <p className="section-subtitle">主画面固定优先，视频区域目标占 70–80% 视口。HUD、骨架、Ghost 手腕路径、相位时间轴和对比入口全部叠在视频层，不再挤占核心取景区。</p>
        </div>
        <div className="capture-header-actions">
          {!stream ? (
            <Button variant="primary" onClick={startPreview}><Camera size={16} /> Start preview</Button>
          ) : (
            <Button variant="warn" onClick={stopPreview}><Square size={16} /> Stop preview</Button>
          )}
          {!recording ? (
            <Button onClick={startRecording} disabled={!stream}><Circle size={16} /> Start recording</Button>
          ) : (
            <Button variant="warn" onClick={stopRecording}><Square size={16} /> Stop recording</Button>
          )}
        </div>
      </section>

      <VideoStudio
        analysis={previewAnalysis.structured}
        videoUrl={previewUrl}
        stream={previewUrl ? null : stream}
        tall
        preset="capture"
      />

      <section className="capture-footer-grid capture-footer-grid--wide">
        <CaptureControl mode="camera" onPreviewUrl={setPreviewUrl} />
        <Card>
          <div className="stack">
            <strong>Capture HUD baked into the stage</strong>
            <div className="muted">Address / Top / Impact / Finish 时间轴、Tempo、Screen quality、Current vs Previous、Current vs Pro 都在视频上叠加展示。</div>
            <div className="stat-card">已替换为视频优先布局：手机端约 78dvh，桌面端约 80dvh，可继续加慢动作回放、逐帧滚轮和双窗口对比。</div>
          </div>
        </Card>
        <CompareMatrix analysis={previewAnalysis.structured} />
      </section>
    </main>
  );
}
