# Rishabh Provision Store 🛒

A modern, high-performance retail management ecosystem designed specifically for provision and grocery stores. It unifies an express Point of Sale (POS) billing terminal, inventory & expiry tracking, customer Khata credit ledger, supplier purchases, and AI-driven business intelligence.

---

## ✨ Key Features

- **⚡ Express POS Billing**: Keyboard-first billing terminal with USB/Bluetooth barcode scanner support & 2"/3" thermal receipt printing.
- **🏬 Stock & Expiry Control**: Real-time inventory tracking, batch management, low-stock alerts, and expiry date notifications.
- **📒 Digital Khata Ledger**: Customer credit ledger tracking, outstanding balance management, and WhatsApp/SMS payment reminders.
- **🛒 Omnichannel Orders**: Consolidated processing for store POS sales and online customer orders.
- **🚚 Suppliers & Purchases**: Supplier management, purchase orders, and stock inward logging.
- **💸 Expense & Profit Analytics**: Operational cost tracking, daily/monthly P&L summaries, and GSTR tax exports.
- **🤖 Gemini AI Assistant**: Conversational stock search, sales trend predictions, and intelligent reordering insights.
- **👥 Multi-Role Access Control**: Tailored workflows for Owner (Admin), Employees (Cashiers), Customers, and Delivery Boys.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State & Query**: Zustand + TanStack Query
- **Icons & Animation**: Lucide React + Framer Motion

### Backend
- **Runtime**: Node.js 22 LTS
- **Framework**: Express.js (TypeScript)
- **Database & ODM**: MongoDB Atlas + Mongoose
- **Auth & Security**: JWT + Refresh Tokens, bcrypt, Helmet, CORS, Rate Limiting
- **File & Media**: Cloudinary + Multer

### Real-Time & Utilities
- **WebSockets**: Socket.IO
- **PDF & Excel**: `pdf-lib` + `ExcelJS`
- **Barcode & QR**: `JsBarcode` + `qrcode`
- **AI**: Gemini Pro API

---

## 📂 Folder Structure

```text
Rishabh-Provision-Store/
├── apps/
│   ├── web/          # React 19 + Vite Frontend Application
│   └── server/       # Node.js + Express.js API Server
├── packages/
│   ├── ui/           # Shared Design System & UI Components
│   ├── database/     # Database Schemas & Connection Package
│   ├── config/       # Shared TSConfig, ESLint & Environment Configs
│   ├── types/        # Shared TypeScript Interfaces & DTOs
│   └── utils/        # Shared Helper Utilities & Formatting Tools
├── prompts/
│   ├── gemini/       # Gemini AI System Prompts & Logic
│   ├── antigravity/  # Antigravity Orchestration Prompts
│   └── shared/       # Shared AI Contexts & Templates
├── docs/             # Complete Project Documentation Suite (01-10)
├── assets/           # Project Brand Assets & Screenshots
└── .github/          # GitHub Actions CI/CD Workflows
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
- [`01-Project-Vision.md`](docs/01-Project-Vision.md) - Executive vision & architecture
- [`02-Features.md`](docs/02-Features.md) - Detailed PRD, User Roles & 15 Modules
- [`03-Roadmap.md`](docs/03-Roadmap.md) - 5-phase development roadmap
- [`04-Database.md`](docs/04-Database.md) - MongoDB collections summary
- [`05-API.md`](docs/05-API.md) - REST API endpoint specifications
- [`06-UIUX.md`](docs/06-UIUX.md) - Layout wireframes for 12 key screens
- [`07-Deployment.md`](docs/07-Deployment.md) - Deployment checklist & CI/CD
- [`08-Todo.md`](docs/08-Todo.md) - Active task tracking
- [`09-Environment.md`](docs/09-Environment.md) - Tech stack & env configs
- [`10-Changelog.md`](docs/10-Changelog.md) - Version release history

---

## 👥 Contributors

- **Prasham Jain** ([@PrashamJain1318](https://github.com/PrashamJain1318)) - Lead Developer & Architect

---

*Made with ❤️ for Rishabh Provision Store.*
