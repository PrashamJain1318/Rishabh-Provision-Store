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

## 🧩 Comprehensive Module Breakdown

### 1. 🔑 Authentication Module
- Multi-role login (Email + Password for Owner/Manager/Cashier; Phone OTP for Customers & Delivery Partners).
- Role-Based Access Control (RBAC) middleware for API security.
- Session management with JWT & Refresh Token rotation.

### 2. 📊 Executive Dashboard Module
- **Live Metrics**: Total daily sales, gross profit estimate, order count, and active customer credit (Udhar).
- **Alert Widgets**: Low-stock warnings, upcoming item expiries, and pending delivery orders.
- **Visual Analytics**: Interactive daily/weekly sales charts and top-selling product widgets.

### 3. 📦 Products Module
- **Catalog Management**: SKU, Product Name, Category, Brand, Unit (kg, g, L, ml, pcs, pack), HSN Code & GST Rate.
- **Pricing Configuration**: Cost Price (CP), Selling Price (SP), and Maximum Retail Price (MRP).
- **Barcode & QR Integration**: Auto-generated or custom barcode/QR code assignment per product.

### 4. 🏬 Inventory Module
- **Stock Tracking**: Real-time quantity updates on sales, purchases, and manual adjustments.
- **Batch & Expiry Management**: Batch number tracking with automated alert tags for expiring provision items.
- **Automated Reordering**: Threshold-based reorder alerts with one-click purchase order generation.

### 5. ⚡ POS Billing Module
- **High-Speed Billing**: Optimized for keyboard-only operation & barcode scanner input.
- **Multi-Payment Modes**: Cash, UPI/QR, Card, Split Payment, and Customer Khata Credit.
- **Thermal Receipt Printing**: Instant print layout for 2-inch / 3-inch thermal printers with store logo & GST breakdown.
- **Shift Reconciliation**: Cashier end-of-day register balancing (expected cash vs collected cash).

### 6. 🛒 Orders Module
- **Omnichannel Order Stream**: Consolidated view of POS bills, online web orders, and phone orders.
- **Order Lifecycle**: `Pending` ➔ `Confirmed` ➔ `Packing` ➔ `Dispatched` ➔ `Delivered` / `Cancelled`.
- **Delivery Assignment**: Auto or manual assignment of orders to active Delivery Partners.

### 7. 📒 Customers & Khata Credit Ledger Module
- **Customer Profiles**: Name, mobile number, delivery address, purchase history, and credit limit.
- **Digital Khata Ledger**: Debit (purchase on credit) and Credit (payment received) transaction records.
- **Automated Reminders**: WhatsApp/SMS notifications for pending balance collection with payment link.

### 8. 🚚 Suppliers & Purchases Module
- **Supplier Directory**: Contact details, GSTIN, address, and payment terms.
- **Purchase Stock Inward**: Add supplier invoices to automatically increase product inventory counts.
- **Accounts Payable**: Track outstanding dues to suppliers and payment history.

### 9. 💸 Expenses Module
- **Expense Logging**: Record operational costs (Rent, Electricity, Staff Wages, Maintenance, Transportation).
- **Category Classification**: Fixed vs Variable expense tracking.
- **P&L Impact**: Direct subtraction of expenses from sales revenue for Net Profit calculation.

### 10. 📈 Reports & Business Intelligence Module
- **Sales Reports**: Daily, weekly, monthly, and yearly revenue & profit breakdown.
- **Inventory Audit Reports**: Fast-moving vs slow-moving stock analysis.
- **GST & Tax Reports**: GSTR-1 and GSTR-3B ready sales and tax summary data exports (CSV/Excel).

### 11. 🧑‍💼 Employees Module
- **Staff Profiles**: Contact details, assigned role (`Owner`, `Manager`, `Cashier`, `Employee`), shift timings.
- **Activity Audit Logs**: Track who created bills, adjusted stock, or logged expenses.
- **Attendance & Wages**: Basic attendance tracking and payout logs.

### 12. 🏷️ Coupons & Loyalty Module
- **Promotional Discounts**: Percentage-based or fixed-amount discount codes.
- **Rule Engines**: Minimum cart value requirements, expiry dates, and usage limits per customer.
- **Loyalty Points**: Customer points accumulation on POS purchases for future bill redemptions.

### 13. 🔔 Notifications Module
- **Multi-Channel Delivery**: In-app notifications, Web Push, SMS, and WhatsApp alerts.
- **Trigger Events**: Low-stock alerts to Owner/Manager, Order status updates to Customer, New order assigned to Delivery Partner.

### 14. 🤖 AI Assistant Module (Gemini Pro)
- **Conversational Queries**: "What were our top 5 selling items this week?" or "Which products are expiring soon?"
- **Smart Inventory Forecast**: Predictive stock reorder recommendations based on historical sales velocity.
- **Natural Language Search**: Semantic search across product descriptions and customer notes.

### 15. ⚙️ Settings Module
- **Store Profile**: Store name, logo, address, phone, GSTIN, thermal printer header/footer text.
- **Tax Configurations**: CGST, SGST, IGST toggle rules.
- **API Keys & Integrations**: Config management for Cloudinary, Razorpay, Resend, and Gemini.
- **Backup & Export**: One-click database export and system restore capabilities.
