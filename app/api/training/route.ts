import { NextRequest, NextResponse } from "next/server";
import drills from "@/data/demo/drills.json";

export async function GET(request: NextRequest) {
  const focus = request.nextUrl.searchParams.get("focus");
  const records = focus
    ? drills.filter((drill) => drill.focus.toLowerCase().includes(focus.toLowerCase()))
    : drills;
  return NextResponse.json({ drills: records });
}
