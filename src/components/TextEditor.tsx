"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function TextEditor({ value, onChange, onClear, isLoading }: Props) {
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const maxChars = 10000;
  const pct = (charCount / maxChars) * 100;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch {
      // Permission denied — ignore
    }
  };

  return (
    <div
      className="glass-card"
      style={{ display: "flex", flexDirection: "column", minHeight: 420 }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            }}
          />
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Input Text
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={handlePaste}
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.8rem" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            Paste
          </button>
          {value && (
            <button
              onClick={onClear}
              className="btn-ghost"
              style={{ padding: "6px 12px", fontSize: "0.8rem" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your AI-generated text here...

Pathum.AI will transform it into natural, human-sounding content using dual-stage AI reasoning."
        disabled={isLoading}
        maxLength={maxChars}
        style={{
          flex: 1,
          border: "none",
          borderRadius: 0,
          background: "transparent",
          padding: "20px",
          minHeight: 320,
          lineHeight: 1.8,
          fontSize: "0.95rem",
          resize: "none",
          opacity: isLoading ? 0.6 : 1,
        }}
      />

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          <span>
            <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>{wordCount}</span>{" "}
            words
          </span>
          <span>
            <span
              style={{
                color: pct > 80 ? "#f97316" : pct > 95 ? "#ef4444" : "var(--text-secondary)",
                fontWeight: 600,
              }}
            >
              {charCount.toLocaleString()}
            </span>
            /{maxChars.toLocaleString()} chars
          </span>
        </div>

        {/* Char usage bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 120,
            height: 4,
            background: "var(--bg-secondary)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(pct, 100)}%`,
              background: pct > 95 ? "#ef4444" : pct > 80 ? "#f97316" : "var(--accent-purple)",
              borderRadius: 999,
              transition: "width 0.2s ease, background 0.2s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
