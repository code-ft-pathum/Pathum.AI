"use client";

import { useState, useRef, useCallback } from "react";
import { useTheme } from "../components/ThemeProvider";
import Header from "../components/Header";
import ContextSelector from "../components/ContextSelector";
import LevelSelector from "../components/LevelSelector";
import TextEditor from "../components/TextEditor";
import ResultPanel from "../components/ResultPanel";
import Toast from "../components/Toast";
import BackgroundOrbs from "../components/BackgroundOrbs";

export type ContextMode = "normal" | "academic" | "speech" | "creative" | "professional" | "casual" | "technical";

export interface HumanizeResult {
  humanized: string;
  stats: {
    originalWords: number;
    humanizedWords: number;
    model: string;
    level: number;
    context: ContextMode;
  };
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export default function HomePage() {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState("");
  const [context, setContext] = useState<ContextMode>("normal");
  const [level, setLevel] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HumanizeResult | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addToast = useCallback((type: ToastMessage["type"], message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const startProgress = () => {
    setProgress(0);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 3 + 1;
      if (p >= 90) {
        p = 90;
        if (progressRef.current) clearInterval(progressRef.current);
      }
      setProgress(Math.round(p));
    }, 400);
  };

  const finishProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
    setTimeout(() => setProgress(0), 800);
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      addToast("error", "Please enter some text to humanize.");
      return;
    }

    if (inputText.length > 10000) {
      addToast("error", "Text exceeds 10,000 characters limit.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    startProgress();

    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, context, level }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to humanize text.");
      }

      setResult(data);
      finishProgress();
      addToast("success", "Text humanized successfully!");
    } catch (err: unknown) {
      finishProgress();
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      addToast("error", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
    setProgress(0);
  };

  return (
    <div
      data-theme={theme}
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      <BackgroundOrbs />
      <Header />

      <main style={{ position: "relative", zIndex: 1, padding: "0 20px 60px" }}>
        {/* Hero Section */}
        <section
          style={{
            textAlign: "center",
            padding: "60px 20px 40px",
            maxWidth: 800,
            margin: "0 auto",
          }}
          className="animate-fade-in-up"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              marginBottom: 24,
              fontSize: "0.8rem",
              color: "var(--accent-purple)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent-purple)",
                display: "inline-block",
                animation: "glow-pulse 2s ease-in-out infinite",
              }}
            />
            Powered by NVIDIA Nemotron
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Transform AI Text into{" "}
            <span className="gradient-text">Human Writing</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 32px",
            }}
          >
            Pathum.AI uses advanced dual-stage reasoning to make AI-generated content
            sound genuinely human — choose your context and intensity level.
          </p>

          {/* Quick stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Context Modes", value: "7" },
              { label: "Humanization Levels", value: "10" },
              { label: "Max Characters", value: "10K" },
            ].map((stat) => (
              <div key={stat.label} className="stat-badge">
                <span style={{ fontWeight: 700 }}>{stat.value}</span>
                <span style={{ opacity: 0.7, fontWeight: 400 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Main App Card */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* Controls Row */}
          <div
            className="glass-card"
            style={{
              padding: "24px 28px",
              marginBottom: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "flex-end",
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <ContextSelector value={context} onChange={setContext} />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <LevelSelector value={level} onChange={setLevel} />
            </div>
            <button
              className="btn-primary"
              onClick={handleHumanize}
              disabled={isLoading}
              style={{
                padding: "14px 32px",
                fontSize: "1rem",
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {isLoading ? (
                <>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span>Humanizing...</span>
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span>Humanize Text</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {progress > 0 && progress < 100 && (
            <div
              style={{
                width: "100%",
                height: 3,
                background: "var(--bg-secondary)",
                borderRadius: 999,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4)",
                  borderRadius: 999,
                  transition: "width 0.4s ease",
                  boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)",
                }}
              />
            </div>
          )}

          {/* Editor Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: result ? "1fr 1fr" : "1fr",
              gap: 20,
            }}
          >
            <TextEditor
              value={inputText}
              onChange={setInputText}
              onClear={handleClear}
              isLoading={isLoading}
            />
            {result && (
              <ResultPanel result={result} onToast={addToast} />
            )}
          </div>
        </div>
      </main>

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={(id: string) => setToasts((p) => p.filter((t) => t.id !== id))} />
        ))}
      </div>
    </div>
  );
}
