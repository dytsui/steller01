import { NextRequest, NextResponse } from "next/server";
import { buildReportPreview } from "@/lib/server/report-preview";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || "preview-report";
  return NextResponse.json(buildReportPreview(id));
}
