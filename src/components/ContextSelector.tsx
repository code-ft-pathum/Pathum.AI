"use client";

import { ContextMode } from "@/app/page";

interface ContextOption {
  id: ContextMode;
  label: string;
  icon: string;
  description: string;
}

const CONTEXTS: ContextOption[] = [
  { id: "normal", label: "Normal", icon: "💬", description: "Everyday conversational tone" },
  { id: "academic", label: "Academic", icon: "🎓", description: "Scholarly, formal writing" },
  { id: "speech", label: "Speech", icon: "🎤", description: "Spoken, verbal patterns" },
  { id: "creative", label: "Creative", icon: "✨", description: "Expressive & imaginative" },
  { id: "professional", label: "Professional", icon: "💼", description: "Business & formal" },
  { id: "casual", label: "Casual", icon: "😊", description: "Relaxed, friendly chat" },
  { id: "technical", label: "Technical", icon: "⚙️", description: "Precise & technical" },
];

interface Props {
  value: ContextMode;
  onChange: (v: ContextMode) => void;
}

export default function ContextSelector({ value, onChange }: Props) {
  const active = CONTEXTS.find((c) => c.id === value);

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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Context Mode
        {active && (
          <span style={{ marginLeft: "auto", color: "var(--accent-purple)", fontWeight: 500, textTransform: "none", letterSpacing: "normal" }}>
            {active.description}
          </span>
        )}
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {CONTEXTS.map((ctx) => (
          <button
            key={ctx.id}
            onClick={() => onChange(ctx.id)}
            className={`chip ${value === ctx.id ? "active" : ""}`}
            title={ctx.description}
          >
            <span>{ctx.icon}</span>
            <span>{ctx.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
