import type { StructuredAnalysis } from "@/lib/analysis/types";

export function OverlaySvg({ analysis }: { analysis: StructuredAnalysis }) {
  const head = analysis.overlays.headBox;
  const [spineTop, spineBottom] = analysis.overlays.spineLine;
  const [shoulderA, shoulderB] = analysis.overlays.shoulderLine;
  const [hipA, hipB] = analysis.overlays.hipLine;
  const trail = analysis.overlays.ghostTrail.map((point) => `${point.x * 100},${point.y * 100}`).join(" ");
  const bodyAxisX = ((spineTop.x + spineBottom.x) / 2) * 100;
  const targetY = 86;

  return (
    <svg className="video-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect x={head.x * 100} y={head.y * 100} width={head.width * 100} height={head.height * 100} rx="2" fill="none" stroke="rgba(210,166,71,0.95)" strokeDasharray="2 2" />
      <line x1={spineTop.x * 100} y1={spineTop.y * 100} x2={spineBottom.x * 100} y2={spineBottom.y * 100} stroke="rgba(85,214,178,0.95)" strokeWidth="0.7" />
      <line x1={shoulderA.x * 100} y1={shoulderA.y * 100} x2={shoulderB.x * 100} y2={shoulderB.y * 100} stroke="rgba(210,166,71,0.95)" strokeWidth="0.65" />
      <line x1={hipA.x * 100} y1={hipA.y * 100} x2={hipB.x * 100} y2={hipB.y * 100} stroke="rgba(121,172,255,0.9)" strokeWidth="0.65" />
      <polyline fill="none" stroke="rgba(85,214,178,0.7)" strokeWidth="0.55" points={trail} />
      <line x1={bodyAxisX} y1="6" x2={bodyAxisX} y2="94" stroke="rgba(255,255,255,0.16)" strokeWidth="0.24" strokeDasharray="1.5 1.4" />
      <line x1="8" y1={targetY} x2="92" y2={targetY} stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
      <rect x="14" y="14" width="72" height="72" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.2" />
      <line x1="22" y1="16" x2="22" y2="84" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" />
      <text x="74" y="18" fill="rgba(255,255,255,0.74)" fontSize="2.8">
        {analysis.phases[2]?.label ?? "Impact"}
      </text>
      <text x="16" y="10" fill="rgba(255,255,255,0.55)" fontSize="2.2">Head box</text>
      <text x="58" y="79" fill="rgba(85,214,178,0.75)" fontSize="2.2">Ghost wrist path</text>
      <text x="8" y="84" fill="rgba(255,255,255,0.55)" fontSize="2.2">Target line</text>
      <text x={bodyAxisX + 1.2} y="10" fill="rgba(255,255,255,0.55)" fontSize="2.1">Body axis</text>
    </svg>
  );
}
