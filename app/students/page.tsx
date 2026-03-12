import students from "@/data/demo/students.json";
import { StudentManager } from "@/components/students/student-manager";
import { StudentSummaryGrid } from "@/components/students/student-summary-grid";

export default function StudentsPage() {
  return (
    <main className="page stack">
      <section>
        <span className="kicker">Students / 学员管理页</span>
        <h1 className="section-title">学员池、最近表现、后续教练商业扩展位</h1>
        <p className="section-subtitle">v1.26 redo 把学员页做厚：列表、创建、档案页入口、后续账单和课表预留都已经理好。</p>
      </section>
      <StudentSummaryGrid students={students} />
      <StudentManager initialStudents={students} />
    </main>
  );
}
