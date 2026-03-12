import { NextResponse } from "next/server";
import { runAnalysis } from "@/lib/analysis/pipeline";

export async function GET() {
  const result = runAnalysis({
    sessionId: "demo-api",
    title: "Demo API swing",
    mode: "upload",
    swingSide: "right",
    screenMode: false
  });
  return NextResponse.json(result);
}
