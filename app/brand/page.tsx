import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function BrandPage() {
  return (
    <main className="page stack">
      <section>
        <span className="kicker">Brand / 品牌系统</span>
        <h1 className="section-title">品牌资源与风格指南</h1>
        <p className="section-subtitle">包含 logo mark、horizontal logo、favicon 与可直接交给设计 / 营销继续扩展的品牌语气。</p>
      </section>

      <Card>
        <div className="grid-2">
          <div className="stack">
            <Image src="/brand/logo-horizontal.svg" alt="Horizontal logo" width={280} height={56} />
            <Image src="/brand/logo-mark.svg" alt="Logo mark" width={80} height={80} />
            <Image src="/brand/favicon.svg" alt="Favicon" width={48} height={48} />
          </div>
          <div className="stack">
            <strong>Brand voice</strong>
            <div className="muted">Elite sports technology · calm coaching authority · visual trust before text persuasion.</div>
            <strong>Core line</strong>
            <div>Trusted analysis first. Trusted coaching report second.</div>
          </div>
        </div>
      </Card>

      <div className="brand-guide-grid">
        {[
          ["Deep Field", "#06110f"],
          ["Tour Mint", "#55d6b2"],
          ["Champagne Gold", "#d2a647"],
          ["Mist White", "#f2f7f5"]
        ].map(([label, value]) => (
          <div className="color-chip" key={label} style={{ background: value }}>
            <strong style={{ color: value === "#06110f" ? "#f2f7f5" : "#06110f" }}>{label}</strong>
            <div style={{ color: value === "#06110f" ? "#f2f7f5" : "#06110f" }}>{value}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
