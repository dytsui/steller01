import { JobDetailView } from "@/components/jobs/job-detail-view";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="page stack">
      <JobDetailView jobId={id} />
    </main>
  );
}
