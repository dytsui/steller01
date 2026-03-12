import drills from "@/data/demo/drills.json";
import { Card } from "@/components/ui/card";

export function TrainingWeekPlan() {
  const days = [
    { label: "Day 1", ids: ["drill-01", "drill-02"] },
    { label: "Day 2", ids: ["drill-03", "drill-04"] },
    { label: "Day 3", ids: ["drill-05", "drill-06"] }
  ];

  return (
    <Card>
      <div className="stack">
        <strong>7-day premium plan slot</strong>
        <div className="muted">已把周计划卡做出来，后面可以直接接会员等级、训练完成度和提醒系统。</div>
        {days.map((day) => (
          <div key={day.label} className="stat-card">
            <strong>{day.label}</strong>
            <div className="muted">
              {drills.filter((drill) => day.ids.includes(drill.id)).map((drill) => drill.title).join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
