# Rishabh Provision Store 🛒

> **Tagline**: *Smart Grocery. Smarter Business.*

---

## 🎯 Mission Statement
To digitize and automate grocery store operations through a unified platform that enables inventory management, billing, online ordering, analytics, and AI-powered assistance.

---

## 👥 User Roles Matrix

| Role | Description | Key Responsibilities |
| :--- | :--- | :--- |
| **Owner** | Complete business control | Full P&L access, employee management, system settings, database backup, and AI insights. |
| **Manager** | Store management | Inventory control, stock inward, employee shift scheduling, and business reports. |
| **Cashier** | Billing & POS operations | Express POS checkout, customer lookup, thermal receipt printing, and daily register balancing. |
| **Employee** | Store & floor operations | Assigned daily tasks, stock shelf replenishment, and product tagging. |
| **Delivery Partner** | Logistics & fulfillment | Order pickup, route navigation, status updates (`Dispatched` ➔ `Delivered`), and COD collection. |
| **Customer** | End consumers | Browse store catalog, place online orders, track delivery, view digital Khata ledger & redeem coupons. |

---

## 🧩 Core Modules & Sub-Modules

### 1. 🔑 Authentication
- Login | Register | OTP Verification | Forgot Password | Profile Management

### 2. 🏬 Inventory Management
- Categories | Brands | Products | Variants | Stock Control | Purchase Orders | Suppliers

### 3. ⚡ POS Billing
- Express Cart Grid | Barcode Scanning | Invoice Generation | GST Breakdown | Multi-Payment | Print Thermal Bill

### 4. 🛒 Online Store (Customer Frontend)
- Homepage | Product Listing | Search & Auto-complete | Filters | Cart | Checkout | Real-time Order Tracking

### 5. 📊 Admin Dashboard & Reports
- Executive Analytics | Sales Velocity | Revenue Graphs | Inventory Audit | Employee Management | Customers & Khata | GSTR Reports

### 6. 🤖 AI Capabilities (Gemini Pro)
- AI Chat Assistant | Product Recommendations | Smart Stock Prediction | Auto Purchase Order Suggestions

---

## 🧠 State Management Architecture

- **UI State** (Sidebar toggle, Dark/Light theme, Modals, Drawers) ➔ **Zustand**
- **Server State** (Products catalog, Orders stream, Customers, Khata ledgers) ➔ **TanStack Query**
- **Form State** (Product forms, Customer signup, POS checkout, Settings) ➔ **React Hook Form (+ Zod)**

---

## 📏 Coding Standards & Conventions

| Element | Convention | Example |
| :--- | :--- | :--- |
| **Components & Layouts** | `PascalCase.tsx` | `ProductCard.tsx`, `DashboardLayout.tsx` |
| **Backend Services/Routes** | `lowercase.suffix.ts` | `product.service.ts`, `order.controller.ts`, `inventory.routes.ts` |
| **Variables & Functions** | `camelCase` | `productPrice`, `totalQuantity` |
| **Constants** | `UPPER_CASE` | `DEFAULT_CURRENCY`, `MAX_REORDER_LIMIT` |
| **Interfaces** | `PascalCase` | `interface Product`, `interface User` |
| **Types** | `PascalCase` | `type OrderStatus`, `type PaymentMode` |

---

## 🛠️ Tech Stack & Architecture

### Frontend (Feature-Driven Architecture)
- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State & Query**: Zustand + TanStack Query + React Hook Form
- **Structure**: Encapsulated features (`features/[module]/{components, pages, hooks, services, types, schemas}`)

### Backend (3-Tier Layered Architecture)
- **Runtime**: Node.js 22 LTS + Express.js (TypeScript)
- **Database & ODM**: MongoDB Atlas + Mongoose
- **Layering**: `Controller ➔ Service ➔ Repository ➔ MongoDB`
- **Auth & Media**: JWT + Refresh Tokens, bcrypt, Helmet, Cloudinary, Multer

---

## 📂 Project Architecture Layout

```text
Rishabh-Provision-Store/
│
├── apps/
│      ├── web/
│      │     └── src/
│      │          ├── assets/
│      │          ├── components/
│      │          ├── features/       # Feature-driven modules (products, orders, etc.)
│      │          │     └── [feature]/
│      │          │          ├── components/
│      │          │          ├── pages/
│      │          │          ├── hooks/
│      │          │          ├── services/
│      │          │          ├── types/
│      │          │          └── schemas/
│      │          ├── hooks/
│      │          ├── layouts/
│      │          ├── lib/
│      │          ├── pages/
│      │          ├── routes/
│      │          ├── services/
│      │          ├── store/          # Zustand UI state stores
│      │          ├── types/
│      │          ├── utils/
│      │          └── App.tsx
│      │
│      └── server/
│            └── src/
│                 ├── config/
│                 ├── controllers/
│                 ├── middlewares/
│                 ├── models/
│                 ├── routes/
│                 ├── services/       # Business Domain Logic
│                 ├── repositories/   # Data Access Queries
│                 ├── validators/
│                 ├── utils/
│                 ├── constants/
│                 ├── types/
│                 ├── jobs/
│                 ├── socket/
│                 ├── app.ts
│                 └── server.ts
│
├── packages/
│      ├── ui/
│      ├── types/
│      ├── database/
│      ├── config/
│      └── utils/
│
├── prompts/
├── docs/
└── assets/
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v22.x` or higher
- **Package Manager**: `npm` / `pnpm`
- **MongoDB**: Local MongoDB instance or MongoDB Atlas Connection URI

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PrashamJain1318/Rishabh-Provision-Store.git
   cd Rishabh-Provision-Store
   ```

2. **Checkout to development branch:**
   ```bash
   git checkout development
   ```

3. **Install workspace dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Refer to [`docs/09-Environment.md`](docs/09-Environment.md) for environment configuration parameters.

5. **Run Development Mode:**
   ```bash
   npm run dev
   ```

---

## 📚 Documentation

Detailed documentation is available in the [`docs/`](docs/) directory:
- [`01-Project-Vision.md`](docs/01-Project-Vision.md) - Executive vision, Tagline & Mission
- [`02-Features.md`](docs/02-Features.md) - Detailed PRD, 6 User Roles & Sub-Modules
- [`03-Roadmap.md`](docs/03-Roadmap.md) - 5-phase development roadmap
- [`04-Database.md`](docs/04-Database.md) - MongoDB collections summary
- [`05-API.md`](docs/05-API.md) - Layered Backend Architecture & REST API endpoints
- [`06-UIUX.md`](docs/06-UIUX.md) - Feature-Driven Frontend Layouts & Wireframes
- [`07-Deployment.md`](docs/07-Deployment.md) - Deployment checklist & CI/CD
- [`08-Todo.md`](docs/08-Todo.md) - Active task tracking
- [`09-Environment.md`](docs/09-Environment.md) - Tech stack & env configs
- [`10-Changelog.md`](docs/10-Changelog.md) - Version release history
- [`11-Code-Conventions.md`](docs/11-Code-Conventions.md) - Coding standards & state management strategy

---

## 👥 Contributors

- **Prasham Jain** ([@PrashamJain1318](https://github.com/PrashamJain1318)) - Lead Developer & Architect

---

*Made with ❤️ for Rishabh Provision Store.*
