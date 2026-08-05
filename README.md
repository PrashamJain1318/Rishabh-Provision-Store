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

## 📂 Monorepo Root Directory Layout

```text
Rishabh-Provision-Store/
│
├── apps/
│   ├── web/           # React 19 + Vite Frontend Application (Port 5173)
│   └── server/        # Express.js + Node.js 22 API Server (Port 5001)
│
├── packages/
│   ├── config/        # Shared Configs & ESLint Package (@rishabh-store/config)
│   ├── database/      # Database Schemas & Connection Package (@rishabh-store/database)
│   ├── types/         # Shared Domain TypeScript Interfaces (@rishabh-store/types)
│   ├── ui/            # 17 Reusable Enterprise Components (@rishabh-store/ui)
│   └── utils/         # Shared Helper & Formatter Package (@rishabh-store/utils)
│
├── docs/              # Complete Project Documentation Suite (01-11)
├── prompts/           # Gemini & AI Assistant System Prompts
├── assets/            # Brand Assets & Screenshots
├── package.json       # Monorepo Root Package Manifest
├── pnpm-workspace.yaml# PNPM Workspace Package Definitions
└── README.md          # Project Architecture & Overview
```

---

## 🛠️ Tech Stack & Architecture

### Frontend (Feature-Driven Architecture)
- **Framework**: React 18/19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite` + shadcn/ui
- **State & Query**: Zustand + TanStack Query + React Hook Form
- **Icons & Motion**: Lucide React + Framer Motion + Sonner

### Backend (3-Tier Layered Architecture)
- **Runtime**: Node.js 22 LTS + Express.js (TypeScript)
- **Database & ODM**: MongoDB Atlas + Mongoose
- **Layering**: `Controller ➔ Service ➔ Repository ➔ MongoDB`
- **Auth & Media**: JWT + Refresh Tokens, bcrypt, Helmet, Cloudinary, Multer

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` / `v22.x` or higher
- **Package Manager**: `pnpm` (`v9.15.9` or higher)

### Installation & Quick Start

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
   pnpm install
   ```

4. **Environment Configuration:**
   Refer to [`apps/server/.env.example`](apps/server/.env.example) and [`.env.example`](.env.example).

5. **Launch Live Development Servers:**
   ```bash
   pnpm dev
   ```
   - **Frontend App**: [`http://localhost:5173`](http://localhost:5173)
   - **Backend API**: [`http://localhost:5001`](http://localhost:5001)

---

## 📚 Documentation Suite

Detailed documentation is available in the [`docs/`](docs/) directory:
- [`01-Project-Vision.md`](docs/01-Project-Vision.md) - Executive vision, Tagline & Mission
- [`02-Features.md`](docs/02-Features.md) - Detailed PRD, 6 User Roles & Sub-Modules
- [`03-Roadmap.md`](docs/03-Roadmap.md) - 5-phase development roadmap
- [`04-Database.md`](docs/04-Database.md) - 15 MongoDB collections summary
- [`05-API.md`](docs/05-API.md) - Layered Backend Architecture & REST API endpoints
- [`06-UIUX.md`](docs/06-UIUX.md) - Design System, Geist font, Emerald palette, 17 UI components & 12 Wireframes
- [`07-Deployment.md`](docs/07-Deployment.md) - Deployment checklist & CI/CD
- [`08-Todo.md`](docs/08-Todo.md) - Active task tracking & Integration Governance
- [`09-Environment.md`](docs/09-Environment.md) - Tech stack & env configs
- [`10-Changelog.md`](docs/10-Changelog.md) - Version release history
- [`11-Code-Conventions.md`](docs/11-Code-Conventions.md) - Coding standards & state management strategy

---

## 👥 Contributors

- **Prasham Jain** ([@PrashamJain1318](https://github.com/PrashamJain1318)) - Lead Developer & Architect

---

*Made with ❤️ for Rishabh Provision Store.*
