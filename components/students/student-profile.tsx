import students from "@/data/demo/students.json";
import records from "@/data/demo/records.json";
import { Card } from "@/components/ui/card";

export function StudentProfile({ studentId }: { studentId: string }) {
  const student = students.find((item) => item.id === studentId) ?? students[0];
  const sessions = records.filter((item) => item.studentId === student.id);

  return (
    <div className="stack">
      <Card className="hero">
        <div className="stack">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="avatar-chip avatar-chip--lg">{student.avatar}</div>
            <div>
              <span className="kicker">Student profile</span>
              <h1 className="section-title" style={{ marginBottom: 8 }}>{student.name}</h1>
              <div className="section-subtitle">{student.level} · HCP {student.handicap} · Dominant {student.dominantHand}</div>
            </div>
          </div>
          <div className="metric-grid metric-grid--three">
            <div className="metric-item"><span className="metric-label">Last score</span><strong>{student.lastScore || "—"}</strong></div>
            <div className="metric-item"><span className="metric-label">Last issue</span><strong>{student.lastIssue}</strong></div>
            <div className="metric-item"><span className="metric-label">Sessions</span><strong>{sessions.length}</strong></div>
          </div>
        </div>
      </Card>

      <section className="grid-2">
        <Card>
          <div className="stack">
            <strong>Coach notes structure</strong>
            {[
              "Lesson notes table already reserved in D1 schema update.",
              "Recent primary issue lets you queue the right drills before the student arrives.",
              "This page is the correct home for packages, renewals, and attendance later."
            ].map((item) => <div key={item} className="stat-card">{item}</div>)}
          </div>
        </Card>
        <Card>
          <div className="stack">
            <strong>Recent sessions</strong>
            {sessions.map((session) => (
              <div key={session.id} className="stat-card">
                <strong>{session.title}</strong>
                <div className="muted">Score {session.score} · {session.primaryIssue}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
