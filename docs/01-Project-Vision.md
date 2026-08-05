# 01. Project Vision & Mission

## Product Name
**Rishabh Provision Store**

## 🏷️ Tagline
*Smart Grocery. Smarter Business.*

## 🚀 Mission Statement
To digitize and automate grocery store operations through a unified platform that enables inventory management, billing, online ordering, analytics, and AI-powered assistance.

---

## 👥 User Roles & Permissions Overview

| Role | Description | Core Responsibilities |
| :--- | :--- | :--- |
| **Owner** | Complete control over the business | Full P&L access, employee management, system settings, database backup, and AI insights. |
| **Manager** | Manage inventory, employees, and reports | Stock inward, expiry tracking, shift schedules, and operational reports. |
| **Cashier** | Billing, POS, customer management | Express POS checkout, customer lookup, thermal receipts, and register balancing. |
| **Employee** | Assigned daily tasks | Floor tasks, stock shelf replenishment, item tagging, and basic inventory checks. |
| **Delivery Partner** | Order delivery management | Order pickup, route navigation, delivery status updates, and COD cash collection. |
| **Customer** | Browse, order, and track purchases | Digital store catalog, order placement, order tracking, Khata credit ledger view, and promo redemption. |

---

## 📦 Core Product Modules
1. **Authentication**: Multi-role login (JWT & OTP), RBAC security.
2. **Dashboard**: Executive metrics, live sales graphs, and real-time alerts.
3. **Products**: Catalog management, SKUs, pricing, GST, and barcodes.
4. **Inventory**: Real-time stock counts, batching, expiry dates, and reordering.
5. **POS Billing**: Ultra-fast cashier terminal, thermal receipts, and multi-payment options.
6. **Orders**: Consolidated online & offline order management lifecycle.
7. **Customers**: Customer directory, Udhar credit limits, and digital Khata ledger.
8. **Suppliers**: Supplier directory, purchase orders, and accounts payable.
9. **Expenses**: Operational cost logging and net profit calculation.
10. **Reports**: Daily/Monthly P&L, GSTR tax exports, and sales analytics.
11. **Employees**: Staff management, role assignments, and shift audit logs.
12. **Coupons**: Promo codes, cart rules, and loyalty point rewards.
13. **Notifications**: In-app alerts, Web Push, SMS, and WhatsApp updates.
14. **AI Assistant (Gemini)**: Conversational insights, smart stock forecasts, and natural search.
15. **Settings**: Store profile, tax parameters, printer configurations, and API keys.

---

## 🏗️ Monorepo Architecture Blueprint
- **Apps**: `apps/web` (React 19 + Vite), `apps/server` (Express.js + TypeScript).
- **Packages**: `packages/ui`, `packages/database`, `packages/config`, `packages/types`, `packages/utils`.
- **Prompts**: `prompts/gemini`, `prompts/antigravity`, `prompts/shared`.
