"use client";

import { useEffect, useState } from "react";
import type { DemoStudent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLocalStudents, saveLocalStudents } from "@/lib/browser/local-store";

export function StudentManager({ initialStudents }: { initialStudents: DemoStudent[] }) {
  const [students, setStudents] = useState<DemoStudent[]>(initialStudents);
  const [name, setName] = useState("");

  useEffect(() => {
    const local = getLocalStudents();
    if (local.length) {
      setStudents(local as DemoStudent[]);
    }
  }, []);

  function addStudent() {
    if (!name.trim()) return;
    const next = [
      {
        id: `stu-${Date.now()}`,
        name,
        level: "New",
        handicap: 24,
        dominantHand: "right" as const,
        lastScore: 0,
        lastIssue: "Pending first swing",
        avatar: name.slice(0, 2).toUpperCase()
      },
      ...students
    ];
    setStudents(next);
    saveLocalStudents(next);
    setName("");
  }

  return (
    <div className="stack">
      <Card>
        <div className="grid-2">
          <div className="field">
            <label>Add student / 添加学员</label>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Ethan Wong" />
          </div>
          <div style={{ display: "flex", alignItems: "end" }}>
            <Button variant="primary" onClick={addStudent}>Create student slot</Button>
          </div>
        </div>
      </Card>

      <div className="grid-2">
        {students.map((student) => (
          <Card key={student.id}>
            <div className="stack">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(85,214,178,0.14)",
                  border: "1px solid rgba(85,214,178,0.2)"
                }}>{student.avatar}</div>
                <div>
                  <strong>{student.name}</strong>
                  <div className="muted">{student.level} · HCP {student.handicap}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="muted">Last score</div>
                <div className="value">{student.lastScore || "—"}</div>
              </div>
              <div className="muted">Last known issue: {student.lastIssue}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
