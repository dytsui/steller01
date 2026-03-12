import type { AnalysisPayload } from "@/lib/analysis/types";

type GeminiCoachDraft = {
  headline?: string;
  summary?: string;
  quickTip?: string;
  goodPoints?: string[];
  priorities?: string[];
  coachScript?: string;
};

function firstTextFromGeminiResponse(payload: any) {
  const candidates = Array.isArray(payload?.candidates) ? payload.candidates : [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts;
    if (!Array.isArray(parts)) continue;
    for (const part of parts) {
      if (typeof part?.text === "string" && part.text.trim()) {
        return part.text.trim();
      }
    }
  }
  return "";
}

function extractJson(raw: string) {
  const fenced = raw.match(/```json\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1];
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start >= 0 && end > start) return raw.slice(start, end + 1);
  return raw;
}

function normalizeDraft(draft: GeminiCoachDraft, fallback: AnalysisPayload["structured"]["report"]) {
  return {
    headline: draft.headline?.trim() || fallback.headline,
    summary: draft.summary?.trim() || fallback.summary,
    quickTip: draft.quickTip?.trim() || fallback.quickTip,
    goodPoints: Array.isArray(draft.goodPoints) && draft.goodPoints.length
      ? draft.goodPoints.map((item) => item.trim()).filter(Boolean).slice(0, 4)
      : fallback.goodPoints,
    priorities: Array.isArray(draft.priorities) && draft.priorities.length
      ? draft.priorities.map((item) => item.trim()).filter(Boolean).slice(0, 3)
      : fallback.priorities,
    coachScript: draft.coachScript?.trim() || fallback.coachScript
  };
}

export async function maybeEnhanceReportWithGemini(payload: AnalysisPayload) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) return payload;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
  const baseUrl = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta";
  const locale = payload.structured.reportMeta.locale;

  const prompt = [
    "You are the commercial copy layer for a golf AI coach app.",
    "You must never invent motion facts, causes, or measurements.",
    "Use only the supplied structured JSON facts.",
    locale === "zh-CN"
      ? "输出以简体中文为主，可夹少量高端运动产品英文短语。"
      : "Output in concise premium coaching English.",
    "Return valid JSON only with keys: headline, summary, quickTip, goodPoints, priorities, coachScript.",
    "goodPoints and priorities must be arrays of short strings.",
    "",
    "Structured facts:",
    JSON.stringify(payload.llmReadyPayload, null, 2)
  ].join("\n");

  const response = await fetch(`${baseUrl}/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    return {
      ...payload,
      structured: {
        ...payload.structured,
        reportMeta: {
          ...payload.structured.reportMeta,
          source: "rules",
          model: `${model}-fallback`,
          generatedAt: new Date().toISOString()
        }
      }
    };
  }

  const json = await response.json();
  const rawText = firstTextFromGeminiResponse(json);
  if (!rawText) return payload;

  try {
    const parsed = JSON.parse(extractJson(rawText)) as GeminiCoachDraft;
    return {
      ...payload,
      structured: {
        ...payload.structured,
        report: normalizeDraft(parsed, payload.structured.report),
        reportMeta: {
          ...payload.structured.reportMeta,
          source: "gemini",
          model,
          generatedAt: new Date().toISOString()
        }
      }
    };
  } catch {
    return {
      ...payload,
      structured: {
        ...payload.structured,
        reportMeta: {
          ...payload.structured.reportMeta,
          source: "rules",
          model: `${model}-parse-fallback`,
          generatedAt: new Date().toISOString()
        }
      }
    };
  }
}
