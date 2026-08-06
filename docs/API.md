# 📡 Rishabh Provision Store - API Documentation

## Base URL
- **Local Development**: `http://localhost:5001/api/v1`
- **Production API**: `https://api.rishabhstore.com/api/v1`

---

## 🔐 Auth & Identity
- `POST /api/v1/auth/register` — Customer / Merchant registration
- `POST /api/v1/auth/login` — Account sign-in (returns JWT access & refresh token)
- `POST /api/v1/auth/refresh` — Refresh expired access token

---

## 👥 Customer CRM (`/customers`)
- `GET /api/v1/customers` — List all customers (Search, filter, page)
- `POST /api/v1/customers` — Register new customer profile
- `GET /api/v1/customers/:id` — Get customer details, wallet balance & points
- `GET /api/v1/customers/:id/addresses` — List delivery addresses
- `POST /api/v1/customers/:id/addresses` — Add home/office address

---

## 🛒 Shopping Cart (`/cart`)
- `GET /api/v1/cart` — Fetch active cart
- `POST /api/v1/cart/items` — Add SKU item to cart
- `PATCH /api/v1/cart/items/:sku` — Update quantity
- `POST /api/v1/cart/merge` — Merge guest cart into logged-in customer cart

---

## 🧾 POS Express Billing (`/pos`)
- `POST /api/v1/pos/checkout` — 1-Click POS counter checkout
- `POST /api/v1/pos/hold` — Hold current POS cart session
- `POST /api/v1/pos/resume` — Resume held cart
- `POST /api/v1/billing/returns` — Process return & stock restoration

---

## 📦 Omnichannel Orders (`/orders`)
- `POST /api/v1/checkout` — Complete 7-step checkout pipeline
- `GET /api/v1/orders` — List orders (Filter by status)
- `GET /api/v1/orders/:id` — Get order details & audit timeline
- `PATCH /api/v1/orders/:id/status` — Transition order lifecycle state

---

## 🤖 AI & BI Decision Engine (`/ai` & `/reports`)
- `POST /api/v1/ai/ask` — Query Gemini AI Business Assistant
- `GET /api/v1/reports/sales` — Export Sales Report (PDF/Excel/CSV)
- `GET /api/v1/reports/inventory` — Export Inventory Valuation Report
