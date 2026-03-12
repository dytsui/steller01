import { NextResponse } from "next/server";
import jobs from "@/data/demo/jobs.json";

export async function GET() {
  return NextResponse.json(jobs);
}
