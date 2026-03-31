"use client";

import { useState } from "react";
import { HumanizeResult, ToastMessage } from "@/app/page";

interface Props {
  result: HumanizeResult;
  onToast: (type: ToastMessage["type"], message: string) => void;
}

export default function ResultPanel({ result, onToast }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.humanized);
      setCopied(true);
      onToast("success", "Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onToast("error", "Failed to copy.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result.humanized], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pathum-ai-humanized-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onToast("info", "Text downloaded!");
  };

  const wordDiff = result.stats.humanizedWords - result.stats.originalWords;
  const wordDiffPct = result.stats.originalWords > 0 
    ? Math.round((wordDiff / result.stats.originalWords) * 100)
    : 0;

  return (
    <div
      className="glass-card animate-fade-in-up"
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
              background: "linear-gradient(135deg, #10b981, #06b6d4)",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
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
            Humanized Output
          </span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleCopy}
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.8rem" }}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ color: "#10b981" }}>Copied!</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.8rem" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            label: "Context",
            value: result.stats.context.charAt(0).toUpperCase() + result.stats.context.slice(1),
            icon: "🎯",
          },
          {
            label: "Level",
            value: `${result.stats.level}/10`,
            icon: "⚡",
          },
          {
            label: "Words",
            value: `${result.stats.humanizedWords}`,
            sub: wordDiff !== 0 ? `${wordDiff > 0 ? "+" : ""}${wordDiff} (${wordDiffPct > 0 ? "+" : ""}${wordDiffPct}%)` : undefined,
            icon: "📝",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 8,
              background: "rgba(139, 92, 246, 0.08)",
              border: "1px solid rgba(139, 92, 246, 0.15)",
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>
                {stat.value}
                {stat.sub && (
                  <span style={{ fontSize: "0.7rem", color: "#10b981", marginLeft: 4 }}>
                    {stat.sub}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          lineHeight: 1.8,
          fontSize: "0.95rem",
          color: "var(--text-primary)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        className="animate-fade-in-up"
      >
        {result.humanized}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.72rem",
          color: "var(--text-muted)",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Dual-stage reasoning via{" "}
        <span
          style={{
            color: "var(--accent-purple)",
            fontWeight: 600,
          }}
        >
          {result.stats.model.split("/").pop()?.split(":")[0] || "Nemotron"}
        </span>
      </div>
    </div>
  );
}
