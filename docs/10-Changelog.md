# 10. Changelog

All notable changes to **Rishabh Provision Store** will be documented in this file.

## [0.1.0] - 2026-08-05

### Added
- **Monorepo Architecture Layout**: Initialized `apps/web` (React 19 + Vite), `apps/server` (Express.js + TypeScript), `packages/` (`ui`, `database`, `config`, `types`, `utils`), `prompts/` (`gemini`, `antigravity`, `shared`), `docs/`, and `assets/`.
- **System Architecture**:
  - **Backend Layered Architecture**: `Controller ➔ Service ➔ Repository ➔ MongoDB` pattern.
  - **Frontend Feature-Driven Architecture**: Encapsulated feature modules in `apps/web/src/features/[module]/{components, pages, hooks, services, types, schemas}`.
  - **3-Tier State Management Strategy**: UI State (Zustand), Server State (TanStack Query), Form State (React Hook Form + Zod).
- **Design System & Aesthetics**:
  - Inspired by **Modern Enterprise + Apple + Stripe + Linear**.
  - **Geist Font Family** & typography hierarchy matrix (Hero 48-60px, Section 36px, Card 20-24px, Body 16px, Small 14px).
  - **Color Palette**: Emerald Green primary, Enterprise Slate secondary, Amber accent, and semantic feedback states (Green, Orange, Red, Blue).
  - **Border Radius**: `rounded-2xl` (`1rem` / `16px`) for cards, buttons, and inputs.
  - **Shadows**: Soft ambient shadows only; no harsh black shadows.
  - **Selective Glassmorphism**: Restricted exclusively to Hero Banner, Analytics Cards, AI Assistant, and Promotional sections.
- **Component Library (`packages/ui`)**: Built 17 reusable components (`Button`, `Input`, `SearchBar`, `ProductCard`, `DashboardCard`, `Sidebar`, `Navbar`, `Modal`, `Drawer`, `Dropdown`, `Table`, `Pagination`, `ChartCard`, `EmptyState`, `LoadingSkeleton`, `Toast`, `Breadcrumb`).
- **Application Shell Layout**: `DashboardLayout.tsx` with Sticky Navbar, Collapsible Sidebar, Main Content, and Footer.
- **Responsive Specifications**: Desktop, Laptop, Tablet, and Mobile viewport directives.
- **Database Architecture**: 15 MongoDB collections defined in [`docs/04-Database.md`](docs/04-Database.md).
- **API Standards**: Standardized `{ success, message, data/error }` response envelope structure.
- **Documentation Suite**: [`docs/01-Project-Vision.md`](docs/01-Project-Vision.md) through [`docs/11-Code-Conventions.md`](docs/11-Code-Conventions.md).
