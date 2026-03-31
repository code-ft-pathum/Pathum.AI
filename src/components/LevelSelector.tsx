"use client";

interface Props {
  value: number;
  onChange: (v: number) => void;
}

const LEVEL_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Minimal", color: "#06b6d4" },
  2: { label: "Slight", color: "#0ea5e9" },
  3: { label: "Light", color: "#3b82f6" },
  4: { label: "Moderate", color: "#6366f1" },
  5: { label: "Balanced", color: "#8b5cf6" },
  6: { label: "Strong", color: "#a855f7" },
  7: { label: "Heavy", color: "#c026d3" },
  8: { label: "Deep", color: "#db2777" },
  9: { label: "Intense", color: "#e11d48" },
  10: { label: "Maximum", color: "#f97316" },
};

export default function LevelSelector({ value, onChange }: Props) {
  const info = LEVEL_LABELS[value] || LEVEL_LABELS[5];
  const percentage = ((value - 1) / 9) * 100;

  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        Humanization Level
        <span
          style={{
            marginLeft: "auto",
            padding: "2px 10px",
            borderRadius: 999,
            fontSize: "0.78rem",
            fontWeight: 700,
            background: `${info.color}22`,
            color: info.color,
            border: `1px solid ${info.color}44`,
            letterSpacing: "normal",
            textTransform: "none",
          }}
        >
          {value}/10 — {info.label}
        </span>
      </label>

      <div style={{ position: "relative", padding: "4px 0" }}>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="level-slider"
          style={
            {
              "--val": `${percentage}%`,
            } as React.CSSProperties
          }
        />
        {/* Tick marks */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
            padding: "0 2px",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              style={{
                fontSize: "0.65rem",
                color: n <= value ? info.color : "var(--text-muted)",
                fontWeight: n === value ? 700 : 400,
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
              onClick={() => onChange(n)}
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
