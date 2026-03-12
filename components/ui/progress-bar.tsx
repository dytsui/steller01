export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress" aria-label={`progress ${value}`}>
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
