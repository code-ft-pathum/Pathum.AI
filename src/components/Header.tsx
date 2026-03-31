"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10, 10, 15, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
      }}
      data-theme={theme}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.15rem",
                letterSpacing: "-0.02em",
              }}
              className="gradient-text"
            >
              Pathum.AI
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              AI Text Humanizer
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <a
            href="#"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              transition: "color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-primary)";
              (e.target as HTMLElement).style.background = "var(--bg-card)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-secondary)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Home
          </a>
          <a
            href="#"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              transition: "color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-primary)";
              (e.target as HTMLElement).style.background = "var(--bg-card)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-secondary)";
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            About
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{
              marginLeft: 8,
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--accent-purple)";
              el.style.color = "var(--accent-purple)";
              el.style.boxShadow = "0 0 12px rgba(139, 92, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--text-secondary)";
              el.style.boxShadow = "none";
            }}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
