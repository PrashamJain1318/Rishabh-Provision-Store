// Design Token: Colors
// Style: Modern Enterprise + Apple + Stripe + Linear

export const colors = {
  primary: {
    DEFAULT: "#059669", // Emerald Green - Grocery, Freshness & Trust
    hover: "#047857",
    light: "#d1fae5",
    dark: "#10b981",
  },
  secondary: {
    DEFAULT: "#475569", // Enterprise Slate
    dark: "#0f172a",
    light: "#94a3b8",
  },
  accent: {
    DEFAULT: "#f59e0b", // Amber - Offers, Discounts & Actions
    hover: "#d97706",
    light: "#fbbf24",
  },
  feedback: {
    success: "#22c55e", // Green
    warning: "#f97316", // Orange
    error: "#ef4444",   // Red
    info: "#3b82f6",    // Blue
  },
  light: {
    bgPrimary: "#ffffff",   // Pure White
    bgSecondary: "#f8fafc", // Light Gray Slate-50
    surface: "#ffffff",
    surfaceHover: "#f1f5f9",
    border: "#e2e8f0",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#94a3b8",
  },
  dark: {
    bgPrimary: "#0b0f17",   // Almost Black (Slate-950, not pure black)
    bgSecondary: "#0f172a",
    surface: "#1e293b",
    surfaceHover: "#334155",
    border: "#334155",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    textMuted: "#64748b",
  },
} as const;
