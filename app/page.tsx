import Link from "next/link";
import { Activity, ArrowRight, Camera, MonitorPlay, ShieldCheck, UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { runAnalysis } from "@/lib/analysis/pipeline";
import { VideoStudio } from "@/components/video/video-studio";
import { FeatureGrid } from "@/components/home/feature-grid";
import { DemoRecordStrip } from "@/components/home/demo-record-strip";
import { SystemMap } from "@/components/home/system-map";

export default function HomePage() {
  const demo = runAnalysis({
    sessionId: "demo-home",
    title: "Ava · 7 iron baseline",
    mode: "upload",
    swingSide: "right",
    screenMode: false,
    historyMetrics: [{ tempoRatio: 2.7, shoulderTurnTop: 79, hipTurnTop: 35, xFactorTop: 33, spineTiltImpact: 25, headSwayImpactCm: 3.4, finishBalance: 86, screenReadability: 85 }]
  });

  return (
    <main className="page stack">
      <section className="grid-2">
        <Card className="hero">
          <div className="stack">
            <span className="kicker"><ShieldCheck size={14} /> 完整可运营商业包 v1.26 · Redo</span>
            <h1 style={{ margin: 0, fontSize: "2.45rem", lineHeight: 1.04 }}>
              Video-first golf AI coach.
              <br />
              Trusted facts before trusted language.
            </h1>
            <p className="section-subtitle">
              Cloudflare-first 高尔夫 AI 教练产品。Capture / Upload / Report / Records / Training / Students / Jobs 都加厚了；可信分析优先链路继续保持：先 phase、tempo、kinematics、issues、score、structured JSON，再由 Gemini 2.5 Flash-Lite 做文案层。
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/report/demo-home"><Button variant="primary"><ArrowRight size={16} /> Open demo report</Button></Link>
              <Link href="/capture"><Button><Camera size={16} /> Capture studio</Button></Link>
              <Link href="/upload"><Button><UploadCloud size={16} /> Upload analysis</Button></Link>
            </div>
            <div className="stats-row">
              <div className="stat-card">
                <div className="muted">Structured JSON first</div>
                <div className="value">Yes</div>
              </div>
              <div className="stat-card">
                <div className="muted">Issue catalog</div>
                <div className="value">48+</div>
              </div>
              <div className="stat-card">
                <div className="muted">Video stage</div>
                <div className="value">78dvh</div>
              </div>
              <div className="stat-card">
                <div className="muted">Cloudflare path</div>
                <div className="value">Workers-first</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="stack">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Badge tone="mint">Capture</Badge>
              <Badge tone="gold">Upload</Badge>
              <Badge>Screen Mode</Badge>
              <Badge>Gemini</Badge>
            </div>
            <div className="muted">
              首页不只是说明页，而是完整商业入口：Demo report、Capture studio、Upload、Jobs、Brand、Students、Training、Records 都能直达，方便你用 GitHub + Cloudflare 直接部署展示。
            </div>
            <div className="grid-2">
              <div className="stat-card">
                <div className="muted">可信分析链路</div>
                <div>Video → preprocessing → pose / time-series → issues → score → JSON → report</div>
              </div>
              <div className="stat-card">
                <div className="muted">Gemini role</div>
                <div>headline / summary / quick tip / coach script only</div>
              </div>
            </div>
            <div className="grid-2">
              <Link href="/jobs"><Button><Activity size={16} /> Job status board</Button></Link>
              <Link href="/brand"><Button><MonitorPlay size={16} /> Brand system</Button></Link>
            </div>
          </div>
        </Card>
      </section>

      <section className="stack">
        <h2 className="section-title">核心视频区域固定 70–80% 占屏</h2>
        <p className="section-subtitle">摄像头或视频主画面仍然是第一主角。骨架、Ghost 手腕路径、中轴线、肩髋线、Tempo HUD、关键帧轨道、对比入口都叠在主画面层。</p>
        <VideoStudio analysis={demo.structured} />
      </section>

      <SystemMap />
      <FeatureGrid />
      <DemoRecordStrip />
    </main>
  );
}
