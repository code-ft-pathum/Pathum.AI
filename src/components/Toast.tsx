"use client";

import { ToastMessage } from "../app/page";
import { useEffect, useState } from "react";

interface Props {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const TOAST_STYLES: Record<ToastMessage["type"], { bg: string; border: string; icon: React.ReactNode }> = {
  success: {
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.3)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    bg: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.3)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  info: {
    bg: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.3)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="8" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  },
};

export default function Toast({ toast, onClose }: Props) {
  const [visible, setVisible] = useState(true);
  const styles = TOAST_STYLES[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(toast.id), 300);
    }, 3700);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${styles.border}`,
        backgroundColor: styles.bg,
        borderRadius: 12,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        minWidth: 280,
        maxWidth: 380,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
        animation: `fade-in-up 0.3s ease-out forwards`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <div style={{ flexShrink: 0 }}>{styles.icon}</div>
      <p
        style={{
          flex: 1,
          fontSize: "0.875rem",
          color: "var(--text-primary)",
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {toast.message}
      </p>
      <button
        onClick={() => onClose(toast.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          padding: 2,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
