import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UpgradeCard() {
  return (
    <Card className="hero">
      <div className="stack">
        <span className="kicker">Premium hook</span>
        <h3 style={{ margin: 0 }}>Unlock Pro compare, weekly trend packs, and coach-ready exports</h3>
        <div className="muted">这张卡是结果页的商业转化入口，当前做成 UI 和内容位，后面可直接接会员体系、支付、权益判断和更高频分析额度。</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="primary">Upgrade plan</Button>
          <Button>See benefits</Button>
        </div>
      </div>
    </Card>
  );
}
