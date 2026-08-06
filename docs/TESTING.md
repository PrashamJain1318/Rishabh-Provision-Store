# 🧪 Rishabh Provision Store - Automated Testing & QA Architecture

## Overview
This document outlines the unit, integration, accessibility, performance, and Playwright End-to-End (E2E) testing strategy for Rishabh Provision Store Enterprise Retail Operating System.

---

## 🎯 Coverage Targets

| Domain | Target Coverage | Tooling |
| :--- | :---: | :--- |
| **Backend Integration & APIs** | **>= 90%** | Vitest + Supertest + mongodb-memory-server |
| **Backend Statements & Lines** | **>= 90%** | @vitest/coverage-v8 |
| **Backend Branches** | **>= 85%** | @vitest/coverage-v8 |
| **Frontend UI Components** | **>= 85%** | Vitest + React Testing Library + happy-dom |
| **E2E Journeys & Browsers** | **100%** | Playwright (Chromium & Mobile Chrome) |

---

## 📁 E2E Test Suite Directory Structure (`apps/web/e2e/`)

```text
apps/web/e2e/
├── auth/
│   └── auth.spec.ts         # Login, Register, Invalid login alerts, JWT expiry & redirects
├── products/
│   └── products.spec.ts     # Catalog CRUD, SKU/Barcode search, category filtering & Cloudinary uploads
├── pos/
│   └── pos.spec.ts          # Cashier POS terminal, Barcode scan, GST math & Tax Invoice generation
├── accessibility/
│   └── a11y.spec.ts         # WCAG 2.0 AA compliance audit using @axe-core/playwright
└── performance/
    └── performance.spec.ts  # Page load, TTI, and Web Vitals benchmarking
```

---

## 🚀 Running Test Commands

### Root Workspace Scripts
- **Run All Unit/Integration Tests**: `pnpm test`
- **Run Backend Tests**: `pnpm test:backend`
- **Run Frontend Tests**: `pnpm test:frontend`
- **Run Playwright E2E Tests**: `pnpm test:e2e`
- **Show Playwright HTML Report**: `npx playwright show-report`
