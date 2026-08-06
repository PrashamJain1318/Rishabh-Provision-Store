# 🛠️ Rishabh Provision Store - Local Setup & Developer Guide

## Prerequisites
- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` (`npm install -g pnpm`)
- **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017`) or Atlas connection string

---

## 🚀 Quickstart Installation

1. **Clone Repository**:
   ```bash
   git clone https://github.com/PrashamJain1318/Rishabh-Provision-Store.git
   cd Rishabh_Provision_Store
   ```

2. **Install Workspace Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` in `apps/server/`:
   ```bash
   cp .env.example apps/server/.env
   ```

4. **Run Development Mode**:
   ```bash
   # Terminal 1: Run Backend Express Server
   pnpm --filter @rishabh-store/server dev

   # Terminal 2: Run Frontend Vite Dev Server
   pnpm --filter @rishabh-store/web dev
   ```

5. **Access Application**:
   - Storefront & BI Portal: `http://localhost:5173`
   - Express POS Terminal: `http://localhost:5173/pos`
   - Backend API: `http://localhost:5001/api/v1`
