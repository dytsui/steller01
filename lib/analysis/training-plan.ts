import type { IssueDetection } from "@/lib/analysis/types";

const drillLibrary: Record<string, { title: string; focus: string; reps: string; cue: string }> = {
  head_sway: {
    title: "Head box strike ladder",
    focus: "Impact stability",
    reps: "3 sets × 6 swings",
    cue: "Keep your head inside the box until the ball is gone."
  },
  restricted_hip_turn: {
    title: "Trail-hip depth wall drill",
    focus: "Hip depth and turn",
    reps: "3 sets × 8 rehearsals",
    cue: "Right pocket goes back, not sideways."
  },
  flat_shoulder: {
    title: "Lead shoulder under chin",
    focus: "Backswing pitch",
    reps: "2 sets × 10 slow reps",
    cue: "Let the left shoulder move down first, not around first."
  },
  spine_loss: {
    title: "Butt-line retain drill",
    focus: "Posture retention",
    reps: "3 sets × 5 pause swings",
    cue: "Chest stays down while pelvis keeps depth."
  },
  tempo_fast: {
    title: "3:1 metronome swing",
    focus: "Transition pacing",
    reps: "2 sets × 12 swings",
    cue: "Three counts up, one count through."
  },
  screen_glare: {
    title: "Re-capture checklist",
    focus: "Screen quality",
    reps: "1 minute setup",
    cue: "Reduce reflections, square up the lens, move closer."
  }
};

export function buildTrainingPlan(issues: IssueDetection[]) {
  const picks = issues.slice(0, 3).map((issue) => drillLibrary[issue.id]).filter(Boolean);
  if (picks.length > 0) {
    return picks;
  }
  return [
    {
      title: "Neutral sequence maintenance",
      focus: "Tempo and finish",
      reps: "2 sets × 10 swings",
      cue: "Smooth top, balanced finish, full chest turn."
    }
  ];
}
