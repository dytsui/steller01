import shareCaptions from "@/data/demo/share-captions.json";
import { Card } from "@/components/ui/card";

export function ShareSheet() {
  return (
    <Card>
      <div className="stack">
        <strong>Social share pack</strong>
        <div className="muted">适配朋友圈、小红书、Instagram Reels、Stories、教练学员群。</div>
        <div className="grid-2">
          <div className="stat-card">
            <span className="metric-label">ZH</span>
            <div>{shareCaptions.zh}</div>
          </div>
          <div className="stat-card">
            <span className="metric-label">EN</span>
            <div>{shareCaptions.en}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
