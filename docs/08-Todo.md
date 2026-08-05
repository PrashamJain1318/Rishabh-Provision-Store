# 08. Active Todo List & Integration Governance

> **🛑 Strict Service Integration Directive**: Do NOT install or configure API keys yet for external cloud services (MongoDB Atlas, Cloudinary, Razorpay, Firebase, Gemini API, Google Maps). Integrate each service ONLY when its corresponding feature module is ready to be built.

---

## Phase 1: Core Foundation & Monorepo Setup
- [x] Repository initialization & workspace directory structure
- [x] Branch `development` creation & initial Git commit
- [x] Monorepo configuration (`package.json`, `pnpm-workspace.yaml`, `pnpm@9.15.9`)
- [x] Shared UI component package (`packages/ui` with 17 components)
- [x] Server Layered Architecture (`Controller ➔ Service ➔ Repository ➔ MongoDB`)
- [x] Web Feature-Driven Architecture (`features/[module]/{components, pages, hooks, services, types, schemas}`)
- [x] 3-Tier State Management Strategy (Zustand, TanStack Query, React Hook Form)
- [x] Standardized API response format (`{ success, message, data/error }`)
- [x] Design system tokens (Modern Enterprise + Apple + Stripe + Linear, Geist font, Emerald/Slate/Amber palette, `rounded-2xl`, soft shadows, selective glassmorphism)
- [x] `.vscode/extensions.json` & `.vscode/settings.json` extension suite
- [x] Frontend React 18 + Vite app running on `http://localhost:5173`
- [x] Backend Express server running on `http://localhost:5001`

---

## Phase 2: Deferred Cloud Service Integrations (On-Demand)

- [ ] **MongoDB Atlas Integration**: Connect database driver when building database schemas & repositories in Phase 2.
- [ ] **Cloudinary Integration**: Connect image upload SDK when building product image & receipt upload features.
- [ ] **Razorpay Integration**: Connect payment gateway SDK when building POS online/UPI payment checkout.
- [ ] **Firebase Authentication**: Connect phone OTP verification when building customer login OTP module.
- [ ] **Gemini Pro API**: Connect AI assistant SDK when building conversational stock search & smart predictions.
- [ ] **Google Maps Platform**: Connect maps SDK when building delivery partner order tracking.
