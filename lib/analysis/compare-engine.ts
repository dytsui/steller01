import standards from "@/data/demo/pro-standards.json";
import type { ComparisonResult, MetricSnapshot } from "@/lib/analysis/types";
import { round } from "@/lib/utils";

type PartialMetric = Partial<MetricSnapshot>;

const trackedKeys: Array<keyof MetricSnapshot> = [
  "shoulderTurnTop",
  "hipTurnTop",
  "xFactorTop",
  "spineTiltImpact",
  "headSwayImpactCm",
  "tempoRatio",
  "finishBalance",
  "screenReadability"
];

export function compareMetrics(current: MetricSnapshot, history: PartialMetric[] = []): ComparisonResult {
  const previous = history[0] ?? current;
  const targets = standards as Record<string, number>;

  const vsPro = Object.fromEntries(trackedKeys.map((key) => {
    const target = typeof targets[key] === "number" ? Number(targets[key]) : current[key];
    return [key, {
      current: round(current[key]),
      target: round(target),
      delta: round(current[key] - target)
    }];
  }));

  const vsHistory = Object.fromEntries(trackedKeys.map((key) => {
    const previousValue = typeof previous[key] === "number" ? Number(previous[key]) : current[key];
    return [key, {
      current: round(current[key]),
      previous: round(previousValue),
      delta: round(current[key] - previousValue)
    }];
  }));

  return { vsPro, vsHistory };
}
