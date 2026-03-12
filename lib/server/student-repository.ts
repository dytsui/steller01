import students from "@/data/demo/students.json";
import type { DemoStudent } from "@/lib/types";

export function listDemoStudents() {
  return students as DemoStudent[];
}

export function getDemoStudentById(studentId: string) {
  return (students as DemoStudent[]).find((item) => item.id === studentId) ?? null;
}
