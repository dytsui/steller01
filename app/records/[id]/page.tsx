import { RecordDetail } from "@/components/records/record-detail";

export default async function RecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="page stack">
      <RecordDetail recordId={id} />
    </main>
  );
}
