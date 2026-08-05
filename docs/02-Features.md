# 02. Product Requirements & Feature Specifications (PRD)

## 📌 Product Identity & Mission

- **Product Name**: Rishabh Provision Store
- **Tagline**: *Smart Grocery. Smarter Business.*
- **Mission**: To digitize and automate grocery store operations through a unified platform that enables inventory management, billing, online ordering, analytics, and AI-powered assistance.

---

## 👥 User Roles & Access Control Matrix (RBAC)

| User Role | Description | Key Access & Capabilities |
| :--- | :--- | :--- |
| **Owner** | Complete control over the business | Full system control, financial P&L reports, employee management, system settings, inventory overrides, database backup, and AI insights. |
| **Manager** | Manage inventory, employees, and reports | Stock inward, batch & expiry management, employee shift scheduling, and business performance reports. |
| **Cashier** | Billing, POS, customer management | Express POS Billing, barcode scanning, customer registration, thermal receipt printing, and cash register shift balancing. |
| **Employee** | Assigned daily tasks | Access to assigned floor tasks, shelf stock replenishment, and product price check lookup. |
| **Delivery Partner** | Order delivery management | Mobile view for assigned delivery orders, customer address navigation, delivery status updates (`Dispatched` ➔ `Delivered`), and Cash on Delivery (COD) collection. |
| **Customer** | Browse, order, and track purchases | Digital store catalog, order placement, order status tracking, digital Khata ledger balance view, and coupon redemptions. |

---

## 🧩 Core Modules & Sub-Modules Architecture

### 1. 🔑 Authentication
- **Login**: Multi-role login supporting Email/Password and Mobile OTP.
- **Register**: Store owner account onboarding & customer registration.
- **OTP Verification**: Phone OTP authentication for Customers and Delivery Partners.
- **Forgot Password**: Secure password reset via SMS/Email link.
- **Profile Management**: Profile updates, address management, and password change.

### 2. 🏬 Inventory Management
- **Categories**: Multi-level product categories and sub-categories.
- **Brands**: Brand directory and brand-wise product grouping.
- **Products**: Complete catalog with SKUs, HSN codes, images, and tax slabs.
- **Variants**: Product variants (e.g. 500g, 1kg, 5kg, 1L, Packet, Box).
- **Stock Control**: Real-time stock counts, stock inward/outward logs, and low-stock alerts.
- **Purchase Orders**: Purchase order generation and stock receipt reconciliation.
- **Suppliers**: Vendor database, purchase history, and accounts payable tracking.

### 3. ⚡ POS (Point of Sale) Billing
- **Express Cart**: Keyboard-optimized cart grid for fast cashier billing.
- **Barcode Scan**: Instant item lookup via USB/Bluetooth barcode scanners.
- **Invoice Generation**: Instant bill generation with unique invoice numbers.
- **GST Breakdown**: Automated CGST, SGST, IGST calculation per item line.
- **Multi-Payment Modes**: Cash, UPI/QR, Credit Card, Split Payment, and Khata Udhar Credit.
- **Print Bill**: 2-inch and 3-inch thermal printer layout with instant print dispatch.

### 4. 🛒 Online Store (Customer Frontend)
- **Homepage**: Banners, featured categories, quick deals, and reorder prompts.
- **Product Listing**: Responsive catalog grid with quick-add cart controls.
- **Search**: Instant predictive search bar for items, brands, and categories.
- **Filters**: Price range, brand, category, in-stock status, and sorting.
- **Cart Management**: Real-time cart calculation, quantity adjustments, and savings summary.
- **Checkout**: Delivery address selector, payment mode choice, and coupon apply.
- **Order Tracking**: Real-time timeline tracking (`Confirmed` ➔ `Packing` ➔ `Out for Delivery` ➔ `Delivered`).

### 5. 📊 Admin Dashboard & Business Intelligence
- **Analytics Overview**: Live gross sales, net profit, order velocity, and customer metrics.
- **Sales Monitoring**: POS sales vs Online sales performance breakdown.
- **Revenue Insights**: Daily, weekly, monthly, and yearly revenue graphs.
- **Inventory Audit**: Fast-moving vs slow-moving stock analysis and expiry risk reports.
- **Employee Management**: Staff profiles, role assignments, shift attendance, and audit logs.
- **Customer Directory**: Customer profiles, order history, credit limits, and Khata ledgers.
- **Reports & Tax Exports**: Downloadable GSTR-1, GSTR-3B tax reports and Excel/PDF business summaries.

### 6. 🤖 AI Capabilities (Gemini Pro)
- **AI Chat Assistant**: Conversational assistant for natural language business queries (e.g., "What was our highest selling item yesterday?").
- **Product Recommendation**: Personalized product recommendations for customer online carts.
- **Smart Stock Prediction**: Predictive stock velocity analysis forecasting future reorder dates.
- **Auto Purchase Suggestion**: Automated purchase order draft generation based on sales trends and supplier lead times.
