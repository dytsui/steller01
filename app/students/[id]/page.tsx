import { StudentProfile } from "@/components/students/student-profile";

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="page stack">
      <StudentProfile studentId={id} />
    </main>
  );
}
