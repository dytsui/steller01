import type { AnalysisInput, AnalysisPayload, IssueDetection, StructuredAnalysis } from "@/lib/analysis/types";

function scoreHeadline(total: number, locale: "en" | "zh-CN") {
  if (locale === "zh-CN") {
    if (total >= 90) return "比赛级动作基础，具备冲高分潜力";
    if (total >= 82) return "整体动作不错，但有一个清晰升级点";
    if (total >= 72) return "可打，但主泄漏点已经暴露";
    return "先重建核心模式，再去追求速度与距离";
  }

  if (total >= 90) return "Tournament-grade motion foundation";
  if (total >= 82) return "Strong swing with one clear upgrade path";
  if (total >= 72) return "Playable motion, but the main leak is visible";
  return "Rebuild the priority pattern before chasing speed";
}

function primaryIssue(issues: IssueDetection[]) {
  return issues[0]?.label ?? "No primary issue detected";
}

export function generateCoachReport(structured: StructuredAnalysis, input: AnalysisInput): AnalysisPayload {
  const strongest = structured.issues[0];
  const second = structured.issues[1];
  const locale = input.coachLocale ?? "zh-CN";

  structured.report = locale === "zh-CN" ? {
    headline: scoreHeadline(structured.score.total, locale),
    summary: `本次${input.mode === "camera" ? "拍摄" : input.mode === "screen" ? "屏幕模式" : "上传"}会话得分 ${structured.score.total}。Tempo 为 ${structured.metrics.tempoRatio}:1，主问题是 ${primaryIssue(structured.issues)}，Screen confidence 为 ${structured.screen.screenConfidence}。`,
    quickTip: strongest?.quickTip ?? "先把挥杆做简单：上杆平顺、头部稳定、收杆站稳。",
    goodPoints: [
      `相位识别平均置信度约为 ${Math.round(structured.phases.reduce((sum, phase) => sum + phase.confidence, 0) / structured.phases.length * 100)}%。`,
      `收杆平衡分数为 ${structured.metrics.finishBalance}。`,
      `上杆时长 ${structured.metrics.backswingSec}s，下杆时长 ${structured.metrics.downswingSec}s。`
    ],
    priorities: [strongest?.label, second?.label].filter(Boolean) as string[],
    coachScript: [
      "这一次最好的基础，是关键相位被稳定识别，所以节奏和躯干数据具有可参考性。",
      strongest ? `优先级一是 ${strongest.label}：${strongest.coachingNote}` : "本次没有明显的重大问题被规则引擎触发。",
      second ? `第二优先级是 ${second.label}。` : "先把第一优先级做好，再进入训练模块巩固。",
      "不要一次同时改太多感觉，先做首个训练动作，再重新拍一杆复测。"
    ].join("")
  } : {
    headline: scoreHeadline(structured.score.total, locale),
    summary: `This ${input.mode} session scored ${structured.score.total}. Tempo is ${structured.metrics.tempoRatio}:1, primary issue is ${primaryIssue(structured.issues)}, and screen confidence is ${structured.screen.screenConfidence}.`,
    quickTip: strongest?.quickTip ?? "Keep the motion simple: smooth backswing, stable head, balanced finish.",
    goodPoints: [
      `Phase confidence averaged ${Math.round(structured.phases.reduce((sum, phase) => sum + phase.confidence, 0) / structured.phases.length * 100)}%.`,
      `Finish balance score is ${structured.metrics.finishBalance}.`,
      `Backswing duration ${structured.metrics.backswingSec}s and downswing ${structured.metrics.downswingSec}s.`
    ],
    priorities: [strongest?.label, second?.label].filter(Boolean) as string[],
    coachScript: [
      "Your best foundation today is that the swing phases were captured clearly enough to trust the sequence data.",
      strongest ? `Priority one is ${strongest.label.toLowerCase()}: ${strongest.coachingNote}` : "No major swing fault triggered the rule engine.",
      second ? `Priority two is ${second.label.toLowerCase()}.` : "Use the training block to consolidate the gains from the primary fix.",
      "Do not change multiple feels at once. Start with the top drill, then re-capture another swing."
    ].join(" ")
  };

  return {
    structured,
    llmReadyPayload: {
      facts: {
        sessionId: structured.sessionId,
        title: structured.title,
        score: structured.score.total,
        tempoRatio: structured.metrics.tempoRatio,
        primaryIssue: strongest?.label ?? "none",
        secondaryIssue: second?.label ?? "none",
        warnings: structured.warnings,
        quickTip: structured.report.quickTip,
        priorities: structured.report.priorities,
        locale
      },
      guardrail: "Use only the supplied structured facts. Do not invent motion faults or causal claims that are not present."
    }
  };
}
