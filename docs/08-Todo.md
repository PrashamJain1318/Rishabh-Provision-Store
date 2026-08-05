# 08. Active Todo List & Integration Governance

> **🛑 UI-First Prototype Rule**: Keep everything using mock data for now. Avoid live API calls, MongoDB database connections, server JWT authentication, and real payment gateway SDKs (Razorpay/UPI). Focus strictly on delivering a 100% fully navigable, ultra-fast, premium UI.

---

## Phase 1: Fully Navigable UI Prototype (Active)
- [x] Monorepo repository setup (`package.json`, `pnpm-workspace.yaml`, `pnpm@9.15.9`)
- [x] Shared UI component package (`packages/ui` with 21 reusable components)
- [x] Design token system (`colors`, `spacing`, `radius`, `shadow`, `typography`, `animation`, `breakpoints`, `zIndex`)
- [x] Light, Dark, and System Theme engine with `localStorage` persistence
- [x] 4 Master Page Layout Shells (`RootLayout`, `DashboardLayout`, `AuthLayout`, `StoreLayout`)
- [x] 11 Primary Page Entry Components (`Landing`, `Login`, `Register`, `Dashboard`, `Products`, `Inventory`, `Orders`, `POS`, `Customers`, `Reports`, `Settings`)
- [x] Express POS Billing terminal screen with barcode search, cart controls, customer selector, coupon redeem, and thermal receipt modal
- [x] Executive Dashboard Home with 9 complete widgets and Recharts sales velocity graph
- [x] Product Catalog with search, category filters, grid/table view switcher, and pagination
- [x] Mock data fixtures suite (`products`, `orders`, `customers`, `analytics`, `notifications`)
- [x] React Router v6 navigation mapping `/`, `/login`, `/register`, `/pos`, `/dashboard/*`
- [x] Mobile responsive viewport adapters for devices `<640px` with slide-over drawer
- [x] Framer Motion micro-animations (page transitions, card hover elevation, scale)

---

## Phase 2: Deferred Backend & Cloud Service Integrations (On-Demand)

- [ ] **MongoDB Atlas Integration**: Deferred until backend database schemas & repositories phase.
- [ ] **Cloudinary Storage Integration**: Deferred until product image & receipt upload module.
- [ ] **Razorpay Payment Gateway**: Deferred until real payment checkout phase.
- [ ] **Firebase Authentication**: Deferred until phone OTP verification module.
- [ ] **Gemini Pro API**: Deferred until AI assistant & smart stock prediction phase.
