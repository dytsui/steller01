"use client";

import { MonitorPlay, Pause, Play, ShieldCheck, SkipBack, SkipForward, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { StructuredAnalysis } from "@/lib/analysis/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ui/score-ring";
import { Timeline } from "@/components/ui/timeline";
import { OverlaySvg } from "@/components/video/overlay-svg";
import { KeyframeRail } from "@/components/video/keyframe-rail";
import { Card } from "@/components/ui/card";

export function VideoStudio({
  analysis,
  title,
  videoUrl,
  stream,
  tall = false,
  preset = "default"
}: {
  analysis: StructuredAnalysis;
  title?: string;
  videoUrl?: string | null;
  stream?: MediaStream | null;
  tall?: boolean;
  preset?: "default" | "capture";
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activePhase = useMemo(() => analysis.phases[2]?.label ?? "Impact", [analysis.phases]);
  const primaryIssue = analysis.issues[0]?.label ?? "Clean pattern";
  const showCapturePreset = preset === "capture";

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (stream && !videoUrl) {
      element.srcObject = stream;
      element.play().catch(() => undefined);
      return;
    }
    if (videoUrl) {
      element.srcObject = null;
      element.src = videoUrl;
      element.load();
    }
  }, [stream, videoUrl]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (playing) element.play().catch(() => undefined);
    else element.pause();
  }, [playing]);

  return (
    <div className={`video-studio ${tall ? "tall" : ""} ${showCapturePreset ? "video-studio--capture" : ""}`}>
      <div className="video-surface">
        {videoUrl || stream ? (
          <video ref={videoRef} controls={false} playsInline muted />
        ) : (
          <div className="video-placeholder" />
        )}
      </div>

      <div className="video-top-overlay">
        <div className="video-title-cluster">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Badge tone="mint">{analysis.mode.toUpperCase()}</Badge>
            <Badge tone="gold">Score {analysis.score.total}</Badge>
            <Badge>{analysis.reportMeta.source === "gemini" ? `Gemini · ${analysis.reportMeta.model}` : "Rules report"}</Badge>
            {analysis.mode === "screen" ? <Badge tone="gold">Screen {Math.round(analysis.screen.screenConfidence)}</Badge> : null}
          </div>
          <div className="video-title-block">
            <strong>{title ?? analysis.title}</strong>
            <span className="muted">Phase-true analysis first · Coach copy second</span>
          </div>
        </div>

        <Card className="mini-score-card" padded={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12 }}>
            <ScoreRing score={analysis.score.total} />
            <div className="stack" style={{ gap: 6 }}>
              <strong>{analysis.report.headline}</strong>
              <span className="muted">Tempo {analysis.metrics.tempoRatio}:1 · {primaryIssue}</span>
            </div>
          </div>
        </Card>
      </div>

      <OverlaySvg analysis={analysis} />

      <div className="video-hud video-hud--capture">
        <div className="video-timeline-shell">
          <Timeline phases={analysis.phases} active={activePhase} />
          <KeyframeRail analysis={analysis} />
        </div>

        <div className="video-kpi-ribbon">
          <div className="glass-chip">
            <span className="label">Phase</span>
            <strong>{activePhase}</strong>
          </div>
          <div className="glass-chip">
            <span className="label">Tempo</span>
            <strong>{analysis.metrics.tempoRatio}:1</strong>
          </div>
          <div className="glass-chip">
            <span className="label">Readability</span>
            <strong>{analysis.screen.readabilityScore}</strong>
          </div>
          <div className="glass-chip">
            <span className="label">Issue</span>
            <strong>{primaryIssue}</strong>
          </div>
        </div>

        <div className="video-bottom-overlay">
          <div className="video-action-dock">
            <Button variant="primary" onClick={() => setPlaying((current) => !current)}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button><SkipBack size={16} /> Prev keyframe</Button>
            <Button><SkipForward size={16} /> Next keyframe</Button>
            <Button><SlidersHorizontal size={16} /> Slow motion</Button>
            <Button><MonitorPlay size={16} /> Compare</Button>
          </div>

          <div className="video-diagnostic-dock">
            <div className="stat-card compact">
              <div className="muted">Current vs Previous</div>
              <div className="value">{analysis.comparison.vsHistory.tempoRatio.delta > 0 ? "+" : ""}{analysis.comparison.vsHistory.tempoRatio.delta}</div>
              <div className="muted">Tempo delta</div>
            </div>
            <div className="stat-card compact">
              <div className="muted">Current vs Pro</div>
              <div className="value">{analysis.comparison.vsPro.xFactorTop.delta > 0 ? "+" : ""}{analysis.comparison.vsPro.xFactorTop.delta}°</div>
              <div className="muted">X-Factor gap</div>
            </div>
            <div className="stat-card compact">
              <div className="muted">Screen quality</div>
              <div className="value">{analysis.screen.screenConfidence}</div>
              <div className="muted">Glare {Math.round(analysis.screen.glareRatio * 100)}% · Subject {Math.round(analysis.screen.subjectScale * 100)}%</div>
            </div>
            <div className="stat-card compact">
              <div className="muted">Trusted chain</div>
              <div className="value" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={18} /> JSON first
              </div>
              <div className="muted">{analysis.reportMeta.source === "gemini" ? "Gemini used for coach copy only" : "Built-in coach copy active"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
