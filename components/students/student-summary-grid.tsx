import Link from "next/link";
import type { DemoStudent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function StudentSummaryGrid({ students }: { students: DemoStudent[] }) {
  return (
    <div className="grid-3">
      {students.map((student) => (
        <Card key={student.id}>
          <div className="stack">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="avatar-chip">{student.avatar}</div>
              <div>
                <strong>{student.name}</strong>
                <div className="muted">{student.level} · HCP {student.handicap}</div>
              </div>
            </div>
            <div className="metric-grid metric-grid--two">
              <div className="metric-item"><span className="metric-label">Last score</span><strong>{student.lastScore || "—"}</strong></div>
              <div className="metric-item"><span className="metric-label">Last issue</span><strong>{student.lastIssue}</strong></div>
            </div>
            <Link href={`/students/${student.id}`}><Button variant="primary">Open profile</Button></Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
