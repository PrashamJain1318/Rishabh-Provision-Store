# 🏗️ Rishabh Provision Store - System Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │       Vite React + Tailwind Web App          │
                               │           (Vercel Production CDN)            │
                               └──────────────────────┬───────────────────────┘
                                                      │ HTTPS REST API
                                                      ▼
                               ┌──────────────────────────────────────────────┐
                               │        Node.js Express API Server            │
                               │        (Railway / Render Environment)        │
                               └──────┬───────────────────────┬───────────────┘
                                      │                       │
                         ┌────────────▼─────────┐    ┌────────▼─────────────┐
                         │ MongoDB Atlas DB     │    │ Google Gemini AI SDK │
                         │ (11 Collections)     │    │ (Business Assistant) │
                         └──────────────────────┘    └──────────────────────┘
```

## Architectural Highlights
- **Monorepo Architecture**: Managed via `pnpm` workspaces (`apps/web`, `apps/server`, `packages/ui`).
- **State Management**: Zustand / React Context with persistent local storage caching.
- **Design Token System**: Custom TailwindCSS theme with glassmorphism & dark mode support.
