# 🧪 Rishabh Provision Store - Automated Testing & QA Architecture

## Overview
This document outlines the testing strategy, framework setup, coverage targets, and CI workflow for Rishabh Provision Store Enterprise Retail Operating System.

---

## 🎯 Coverage Targets

| Domain | Target Coverage | Tooling |
| :--- | :---: | :--- |
| **Backend Integration & APIs** | **>= 90%** | Vitest + Supertest + mongodb-memory-server |
| **Backend Statements & Lines** | **>= 90%** | @vitest/coverage-v8 |
| **Backend Branches** | **>= 85%** | @vitest/coverage-v8 |
| **Frontend UI Components** | **>= 85%** | Vitest + React Testing Library + jsdom |

---

## 📁 Test Directory Structure

```text
apps/server/
└── tests/
    ├── setup.ts               # mongodb-memory-server lifecycle hooks
    ├── helpers/
    │   └── testApp.ts         # Express test app & Supertest agent
    ├── integration/
    │   ├── auth.test.ts       # Registration, Login, JWT & Role RBAC
    │   ├── products.test.ts   # Catalog CRUD, Barcode & SKU Filtering
    │   ├── inventory.test.ts  # Stock summary & low-stock alerts
    │   ├── pos.test.ts        # Express Cashier Checkout & Tax Invoices
    │   ├── customers.test.ts  # Customer CRM & Profile management
    │   └── orders.test.ts     # Order fulfillment status transitions
    └── unit/
        ├── payment.test.ts    # Razorpay orders, HMAC SHA-256 signatures & refunds
        ├── upload.test.ts     # Cloudinary CDN stream processing
        ├── ai.test.ts         # Google Gemini AI prompts & forecasting
        ├── maps.test.ts       # Google Maps Platform Geocoding & Directions
        └── notifications.test.ts # Firebase Admin FCM push notifications

apps/web/
└── tests/
    ├── setup.ts               # jsdom matchMedia global mocks
    └── components/
        └── UIComponents.test.tsx # Button, Modal & MapPicker tests
```

---

## 🚀 Running Test Commands

### Root Workspace Scripts
- **Run All Tests**: `pnpm test`
- **Run Backend Tests**: `pnpm test:backend`
- **Run Frontend Tests**: `pnpm test:frontend`
- **Generate Backend Coverage**: `pnpm --filter @rishabh-store/server test:coverage`
- **Watch Mode**: `pnpm test:watch`

---

## ⚙️ CI / CD Integration
Automated testing is enforced on every Pull Request and Push to `main` or `development` via GitHub Actions (`.github/workflows/ci.yml`).
