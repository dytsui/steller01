import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="page stack">
      <section>
        <span className="kicker">Settings</span>
        <h1 className="section-title">项目设置位</h1>
        <p className="section-subtitle">预留给会员权益、通知偏好、语言、品牌主题和教练机构设置。</p>
      </section>
      <Card>
        <div className="stack">
          <strong>Reserved modules</strong>
          <div className="muted">Billing, memberships, academy branding, export formats, notification rules, AI usage limits.</div>
        </div>
      </Card>
    </main>
  );
}
