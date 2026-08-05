// Design Token: Colors
// Style: Modern Enterprise + Apple + Stripe + Linear

export const colors = {
  // Brand Primary & Secondary
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

  // Semantic Feedback
  success: {
    DEFAULT: "#22c55e",
    light: "#dcfce7",
    dark: "#15803d",
  },
  warning: {
    DEFAULT: "#f97316",
    light: "#ffedd5",
    dark: "#c2410c",
  },
  error: {
    DEFAULT: "#ef4444",
    light: "#fee2e2",
    dark: "#b91c1c",
  },
  info: {
    DEFAULT: "#3b82f6",
    light: "#dbeafe",
    dark: "#1d4ed8",
  },

  // Surface & Background Colors
  surface: {
    DEFAULT: "#ffffff",
    hover: "#f8fafc",
    active: "#f1f5f9",
    border: "#e2e8f0",
    dark: "#1e293b",
    darkHover: "#334155",
    darkBorder: "#334155",
  },
  background: {
    light: "#ffffff",
    secondary: "#f8fafc",
    dark: "#0b0f17",      // Almost Black Slate-950
    darkSecondary: "#0f172a",
  },

  // Sidebar Specific Colors
  sidebar: {
    bg: "#0f172a",         // Slate 900
    border: "#1e293b",
    active: "#059669",
    hover: "#1e293b",
    text: "#94a3b8",
    activeText: "#ffffff",
  },

  // Dashboard Specific Colors
  dashboard: {
    cardBg: "#ffffff",
    cardGlass: "rgba(255, 255, 255, 0.80)",
    cardGlassDark: "rgba(15, 23, 42, 0.75)",
    kpiSales: "#059669",
    kpiProfit: "#3b82f6",
    kpiKhata: "#f59e0b",
    kpiStock: "#ef4444",
  },

  // Chart Palette (Recharts & ApexCharts)
  chart: {
    emerald: "#059669",
    blue: "#3b82f6",
    amber: "#f59e0b",
    purple: "#8b5cf6",
    rose: "#f43f5e",
    cyan: "#06b6d4",
    indigo: "#6366f1",
  },
} as const;
