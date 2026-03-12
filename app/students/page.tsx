import studentsData from "@/data/demo/students.json";
import type { DemoStudent } from "@/lib/types";
import { StudentSummaryGrid } from "@/components/students/student-summary-grid";
import { StudentManager } from "@/components/students/student-manager";

const students = studentsData as DemoStudent[];

export default function StudentsPage() {
  return (
    <main className="page stack">
      <section>
        <span className="kicker">Students / 学员页</span>
        <h1 className="section-title">学员管理、训练分层、历史成绩入口</h1>
        <p className="section-subtitle">
          v1.26 redo 把学员页做厚：列表、创建、档案页入口、后续账单和课表预留都已经理好。
        </p>
      </section>

      <StudentSummaryGrid students={students} />
      <StudentManager initialStudents={students} />
    </main>
  );
}
