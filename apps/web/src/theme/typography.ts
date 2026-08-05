// Design Token: Typography Hierarchy (Geist Font Family)

export const typography = {
  fontFamily: {
    sans: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Geist Mono', monospace",
  },
  fontSize: {
    hero: { size: "clamp(3rem, 5vw, 3.75rem)", lineHeight: "1.1", weight: 700 },     // 48px - 60px
    sectionTitle: { size: "2.25rem", lineHeight: "1.25", weight: 700 },             // 36px
    cardTitle: { size: "clamp(1.25rem, 2vw, 1.5rem)", lineHeight: "1.35", weight: 600 }, // 20px - 24px
    body: { size: "1rem", lineHeight: "1.5", weight: 400 },                          // 16px
    caption: { size: "0.875rem", lineHeight: "1.4", weight: 400 },                    // 14px
  },
} as const;
