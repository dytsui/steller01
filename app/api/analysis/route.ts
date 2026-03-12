import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runAnalysis } from "@/lib/analysis/pipeline";
import { maybeEnhanceReportWithGemini } from "@/lib/server/gemini-report";

const requestSchema = z.object({
  sessionId: z.string(),
  title: z.string().optional(),
  mode: z.enum(["camera", "upload", "screen"]),
  swingSide: z.enum(["left", "right"]).default("right"),
  screenMode: z.boolean().default(false),
  coachLocale: z.enum(["en", "zh-CN"]).default("zh-CN").optional(),
  screenDiagnostics: z.object({
    brightnessMean: z.number(),
    contrast: z.number(),
    glareRatio: z.number(),
    edgeDensity: z.number(),
    borderConfidence: z.number(),
    subjectScale: z.number(),
    anglePenalty: z.number(),
    bandingScore: z.number(),
    readabilityScore: z.number().optional(),
    screenConfidence: z.number().optional(),
    warnings: z.array(z.string()).optional()
  }).optional(),
  historyMetrics: z.array(z.record(z.string(), z.number())).optional(),
  videoMeta: z.object({
    durationSec: z.number().optional(),
    frameCount: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    sourceLabel: z.string().optional()
  }).optional(),
  student: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    handicap: z.number().optional()
  }).optional()
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = requestSchema.parse(body);
  const base = runAnalysis(parsed);
  const enhanced = await maybeEnhanceReportWithGemini(base);
  return NextResponse.json(enhanced);
}
