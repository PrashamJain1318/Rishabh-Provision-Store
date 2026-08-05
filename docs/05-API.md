# 05. Backend Architecture & API Specifications

## 🏗️ Layered Architecture Pattern

To ensure clean separation of concerns, high testability, and enterprise maintainability, `apps/server` follows a strict 3-tier layered architecture pattern:

```text
HTTP Request
     │
     ▼
[ Controller Layer ]  ──► Handles HTTP Request/Response & Status Codes
     │
     ▼
[ Service Layer ]     ──► Contains Business Logic, Validation & Rules
     │
     ▼
[ Repository Layer ]  ──► Manages Data Access & MongoDB Queries via Mongoose
     │
     ▼
[ MongoDB Database ]  ──► Persistent Data Store
```

### Directory Breakdown (`apps/server/src/`)
- `config/` - Database, Redis, Cloudinary & environment configs.
- `controllers/` - Route handlers processing request params and sending responses.
- `middlewares/` - Auth JWT verification, RBAC permissions, error handling, rate limiting.
- `models/` - Mongoose schemas and entity models.
- `routes/` - Express route definitions mapping URLs to controllers.
- `services/` - Core business logic, pricing math, stock rules, transaction flows.
- `repositories/` - Direct database queries, abstractions, and aggregation pipelines.
- `validators/` - Zod schema validation rules for incoming requests.
- `utils/` - Formatter helpers, calculation functions, response builders.
- `constants/` - Status codes, error messages, system defaults.
- `types/` - Express request extensions, internal interfaces.
- `jobs/` - Cron jobs, background workers, automated tasks.
- `socket/` - Real-time Socket.IO event handlers and rooms.
- `app.ts` - Express app setup and middleware registration.
- `server.ts` - Server HTTP listener and process initialization.

---

## 📡 Core API Endpoints Overview

### Auth Endpoints
- `POST /api/v1/auth/login` - Authenticate user & issue token.
- `POST /api/v1/auth/register` - Account registration.
- `POST /api/v1/auth/otp/send` - Send phone OTP.
- `POST /api/v1/auth/otp/verify` - Verify OTP & issue session token.
- `GET  /api/v1/auth/me` - Get current user profile.

### Product & Inventory Endpoints
- `GET    /api/v1/products` - List products with pagination & search.
- `POST   /api/v1/products` - Create new product catalog item.
- `GET    /api/v1/products/:id` - Fetch product details & variants.
- `PUT    /api/v1/products/:id` - Update product information.
- `DELETE /api/v1/products/:id` - Soft delete product.
- `GET    /api/v1/products/barcode/:code` - Quick barcode scan lookup.

### POS Transactions Endpoints
- `POST   /api/v1/transactions` - Create new sales bill / POS transaction.
- `GET    /api/v1/transactions` - List past transactions.
- `GET    /api/v1/transactions/:id` - Get transaction invoice details.

### Customer Khata Endpoints
- `GET    /api/v1/customers` - List customers with credit balances.
- `POST   /api/v1/customers` - Register new customer profile.
- `GET    /api/v1/customers/:id/ledger` - Fetch customer credit ledger history.
- `POST   /api/v1/customers/:id/payments` - Record payment against customer credit.
