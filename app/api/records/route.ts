import { NextResponse } from "next/server";
import { listDemoRecords } from "@/lib/server/record-repository";

export async function GET() {
  return NextResponse.json({ records: listDemoRecords() });
}
