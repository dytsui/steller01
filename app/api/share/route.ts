import { NextResponse } from "next/server";
import shareCaptions from "@/data/demo/share-captions.json";

export async function GET() {
  return NextResponse.json(shareCaptions);
}
