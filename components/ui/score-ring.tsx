export function ScoreRing({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (score / 100) * circumference;

  return (
    <svg className="score-ring" viewBox="0 0 100 100" aria-label={`score ${score}`}>
      <defs>
        <linearGradient id="scoreGradient" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#55d6b2" />
          <stop offset="100%" stopColor="#d2a647" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="url(#scoreGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dash}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="48" textAnchor="middle" fontSize="24" fontWeight="700" fill="#f2f7f5">
        {Math.round(score)}
      </text>
      <text x="50" y="66" textAnchor="middle" fontSize="10" fill="#9fb0aa">
        SCORE
      </text>
    </svg>
  );
}
