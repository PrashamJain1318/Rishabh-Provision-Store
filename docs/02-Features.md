# 02. Product Requirements & Feature Specifications (PRD)

## 📌 Executive Product Summary
**Rishabh Provision Store** is an end-to-end retail ecosystem comprising a high-speed Point of Sale (POS) terminal, an executive store management backend, a customer ordering storefront, and a delivery partner portal.

---

## 👥 User Roles & Access Control Matrix (RBAC)

| User Role | Description | Key Access & Capabilities |
| :--- | :--- | :--- |
| **Owner (Admin)** | Store owner & business administrator | Full system control, financial reports, employee management, settings, inventory adjustments, and AI insights. |
| **Employee** | Store cashiers, inventory managers & floor staff | Access to POS Billing, product stock lookup, customer registration, and basic order processing. No access to financial margins or employee management. |
| **Customer** | End consumers ordering online or tracking credit | Access to digital store catalog, order placement, order status tracking, digital Khata ledger view, and coupons. |
| **Delivery Boy** | Store delivery personnel | Mobile-first access to assigned delivery orders, customer address navigation, status updates (Picked Up, Out for Delivery, Delivered), and Cash on Delivery (COD) collection. |

---

## 🧩 Comprehensive Module Breakdown

### 1. 🔑 Authentication Module
- Multi-role login (Email + Password for Admin/Staff; Phone OTP for Customers & Delivery Boys).
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
- **Delivery Assignment**: Auto or manual assignment of orders to active Delivery Boys.

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
- **Staff Profiles**: Contact details, assigned role (`Admin`, `Cashier`, `Manager`), shift timings.
- **Activity Audit Logs**: Track who created bills, adjusted stock, or logged expenses.
- **Attendance & Wages**: Basic attendance tracking and payout logs.

### 12. 🏷️ Coupons & Loyalty Module
- **Promotional Discounts**: Percentage-based or fixed-amount discount codes.
- **Rule Engines**: Minimum cart value requirements, expiry dates, and usage limits per customer.
- **Loyalty Points**: Customer points accumulation on POS purchases for future bill redemptions.

### 13. 🔔 Notifications Module
- **Multi-Channel Delivery**: In-app notifications, Web Push, SMS, and WhatsApp alerts.
- **Trigger Events**: Low-stock alerts to Admin, Order status updates to Customer, New order assigned to Delivery Boy.

### 14. 🤖 AI Assistant Module (Gemini Pro)
- **Conversational Queries**: "What were our top 5 selling items this week?" or "Which products are expiring soon?"
- **Smart Inventory Forecast**: Predictive stock reorder recommendations based on historical sales velocity.
- **Natural Language Search**: Semantic search across product descriptions and customer notes.

### 15. ⚙️ Settings Module
- **Store Profile**: Store name, logo, address, phone, GSTIN, thermal printer header/footer text.
- **Tax Configurations**: CGST, SGST, IGST toggle rules.
- **API Keys & Integrations**: Config management for Cloudinary, Razorpay, Resend, and Gemini.
- **Backup & Export**: One-click database export and system restore capabilities.
