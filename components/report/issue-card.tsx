import type { IssueDetection } from "@/lib/analysis/types";
import { Badge } from "@/components/ui/badge";

export function IssueCard({ issue, index }: { issue: IssueDetection; index: number }) {
  const tone = issue.severity === "major" ? "danger" : issue.severity === "moderate" ? "gold" : "mint";
  return (
    <div className="issue-card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div className="muted">Priority {index + 1}</div>
          <strong>{issue.label}</strong>
        </div>
        <Badge tone={tone}>{issue.severity}</Badge>
      </div>
      <div className="muted">{issue.evidence}</div>
      <div>{issue.coachingNote}</div>
      <div className="stat-card">
        <div className="muted">Quick tip</div>
        <div>{issue.quickTip}</div>
      </div>
    </div>
  );
}
