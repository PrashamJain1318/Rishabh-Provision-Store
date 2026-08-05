# 06. UI/UX Planning & Design System Specifications (Phase 0.6)

## 🎨 Design System & Color Palette

### Aesthetic DNA
- **Design Fusion**: **Modern Enterprise + Apple + Stripe + Linear**
- **Tone**: Clean, professional, minimal, ultra-fast, and distraction-free.

---

### 🎨 Color Palette Specifications

| Role | Color Name | Hex Code / Tailwind Class | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary** | Emerald Green | `#059669` (`emerald-600`) / `#10B981` | Grocery identity, freshness, trust, and primary actions. |
| **Secondary** | Enterprise Slate | `#475569` (`slate-600`) / `#0F172A` | Professional enterprise look, secondary buttons & text. |
| **Accent** | Amber | `#F59E0B` (`amber-500`) / `#FBBF24` | Special offers, discount tags, and important highlighted CTAs. |
| **Success** | Green | `#22C55E` (`green-500`) | Successful operations, paid status, and positive stock trends. |
| **Warning** | Orange | `#F97316` (`orange-500`) | Low stock alerts, pending approvals, and expiring stock warnings. |
| **Error** | Red | `#EF4444` (`red-500`) | Out-of-stock alerts, failed payments, and delete actions. |
| **Info** | Blue | `#3B82F6` (`blue-500`) | Informational badges, tooltips, and neutral status updates. |

---

### 🌗 Light vs. Dark Theme Rules

- **Light Theme**: Pure white background (`#FFFFFF`) with soft light-gray section backgrounds (`#F8FAFC` / `slate-50`).
- **Dark Theme**: Almost black slate background (`#0B0F17` / `slate-950`). Strictly **NO pure black (`#000000`)** to prevent high-contrast eye strain.

---

### 🔳 Border Radius
- **Card Radius**: `rounded-2xl` (`1rem` / `16px`)
- **Button Radius**: `rounded-2xl` (`0.75rem` - `1rem`)
- **Input Radius**: `rounded-2xl` (`0.75rem` - `1rem`)

### 🌫️ Soft Ambient Shadows
- **Rule**: Use multi-layered soft ambient shadows only (`rgba(15, 23, 42, 0.06 - 0.10)`).
- **Prohibited**: No harsh black shadows or heavy opacity drops.

### ✨ Glassmorphism Boundaries
- **Strict Scope Rule**: Glassmorphism (`backdrop-blur` with translucent borders) is restricted **EXCLUSIVELY** to:
  1. **Hero Banner**
  2. **Analytics Cards**
  3. **AI Assistant Modal & Drawer**
  4. **Promotional Banner Sections**
- **Do NOT use glassmorphism everywhere** (keep standard tables, forms, POS grids, and navigation sidebars clean solid surfaces for maximum performance and readability).

---

## 📐 Layout Wireframes

### 1. 🏠 Landing Page Wireframe
```text
+-----------------------------------------------------------------------------------+
|  [Logo] Rishabh Store      [Features] [Pricing] [About]    [ Login ] [ Register ] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|    [ HERO BANNER (Glassmorphism): Modern Provision Store Management & POS ]      |
|    [ Subtext: Speed up sales, track stock, and manage customer credit easily. ]   |
|                                                                                   |
|           [ Launch Live POS Demo ]         [ Register Store ]                     |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  [ Feature Card 1 ]     |  [ Feature Card 2 ]     |  [ Feature Card 3 ]           |
|  Express POS Billing    |  Stock & Expiry Alert   |  Digital Khata Ledger         |
+-----------------------------------------------------------------------------------+
|  Footer: © 2026 Rishabh Provision Store | Privacy Policy | Terms of Service       |
+-----------------------------------------------------------------------------------+
```

---

### 2. 🔑 Login Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                      +-------------------------------------+                      |
|                      |  [Logo] Rishabh Provision Store     |                      |
|                      |  Welcome Back - Login to Workspace  |                      |
|                      |-------------------------------------|                      |
|                      |  Role: [ Owner/Staff | Customer ]   |                      |
|                      |  Mobile / Email Input: [          ] |                      |
|                      |  Password / OTP:       [          ] |                      |
|                      |  [x] Remember me    [Forgot Pass?]  |                      |
|                      |  [      SIGN IN BUTTON            ] |                      |
|                      |  Don't have an account? [Register]  |                      |
|                      +-------------------------------------+                      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

### 3. 📝 Register Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                      +-------------------------------------+                      |
|                      |  Create Store Account               |                      |
|                      |-------------------------------------|                      |
|                      |  Store Name:   [                  ] |                      |
|                      |  Owner Name:   [                  ] |                      |
|                      |  Mobile No:    [                  ] |                      |
|                      |  Email:        [                  ] |                      |
|                      |  Password:     [                  ] |                      |
|                      |  GSTIN (Opt):  [                  ] |                      |
|                      |  [    CREATE STORE ACCOUNT        ] |                      |
|                      |  Already registered? [Login]        |                      |
|                      +-------------------------------------+                      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

### 4. 📊 Dashboard Layout Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Header: Store Name | [Search] | [Branch Dropdown] | [Profile Menu] |
|--------------+--------------------------------------------------------------------|
| - Dashboard  | [ Analytics Card 1 (Glass) ] | [ Analytics Card 2 (Glass) ]        |
| - Products   | Today's Revenue: ₹ 24,500    | Total Bills: 142 Bills              |
| - Inventory  +--------------------------------------------------------------------+
| - Orders     | [ Sales Analytics Chart (Weekly) ]      | [ Recent POS Bills ]     |
| - POS        |                                         | Bill #1042 - ₹ 450 (Cash) |
| - Customers  |                                         | Bill #1041 - ₹ 890 (UPI)  |
| - Suppliers  +--------------------------------------------------------------------+
| - Reports    | [ Low Stock Alert Table ]               | [ Quick POS Action ]     |
| - Settings   |                                         |                          |
+--------------+-----------------------------------------+--------------------------+
```

---

### 5. 📦 Products Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Products Catalog | [Search Product / Barcode] | [+ Add Product]    |
|--------------+--------------------------------------------------------------------|
| Filter:      | [ Category Filter ]  [ Stock Status Filter ]  [ Export CSV ]       |
| Categories   +--------------------------------------------------------------------+
| - Grains     | [Barcode] | Product Name | Category | Unit | Price | Stock | Actions|
| - Oils       | 890123... | Fortune Oil  | Oils     | 1 L  | ₹ 145 | 45    | [Edit] |
| - Spices     | 890456... | Basmati Rice | Grains   | 5 kg | ₹ 450 | 12    | [Edit] |
| - Snacks     | 890789... | Tata Salt    | Spices   | 1 kg | ₹ 28  | 3     | [Alert]|
|              +--------------------------------------------------------------------+
|              | Pagination: [ Previous ] Page 1 of 5 [ Next ]                      |
+--------------+--------------------------------------------------------------------+
```

---

### 6. 🏬 Inventory Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Inventory & Stock Control | [Stock Inward] [Adjust Stock]          |
|--------------+--------------------------------------------------------------------|
| Tabs:        | [ Active Stock ]  [ Low Stock Alerts ]  [ Expiring Soon (30 Days) ]|
| - Overview   +--------------------------------------------------------------------+
| - Expiry Log | SKU | Item Name | Batch No | Expiry Date | In-Stock | Reorder Level|
| - Stock Audit| B01 | Milk Pack | B-2026A  | 2026-08-10  | 15 Pcs   | 20 Pcs (Low) |
|              | B02 | Curd 500g | B-2026B  | 2026-08-08  | 4 Pcs    | 10 Pcs (Alert|
+--------------+--------------------------------------------------------------------+
```

---

### 7. 🛒 Orders Management Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Orders Stream | Filter: [ All | POS Bills | Online Orders ]        |
|--------------+--------------------------------------------------------------------|
| Orders List: | Order ID | Source | Customer   | Total   | Status      | Actions    |
| - Pending    | #ORD-981 | Online | Rahul Sharma| ₹ 1,250| Pending     | [Assign]   |
| - Dispatched | #ORD-980 | POS    | Walk-in    | ₹ 340   | Completed   | [Print]    |
| - Delivered  | #ORD-979 | Online | Priya Patel | ₹ 620   | Dispatched  | [Track]    |
+--------------+--------------------------------------------------------------------+
```

---

### 8. ⚡ POS Billing Terminal Layout Wireframe (Speed-Optimized Grid)
```text
+-----------------------------------------------------------------------------------+
| POS Terminal | Cashier: Suresh | Shift: Active | Bill #1043 | [F2 Search Product] |
+------------------------------------------------------+----------------------------+
| [ Cart Items Table ]                                 | [ Quick Checkout Panel ]   |
| Item Name     | Qty | Price | Total    | Action      | Total Items:  4 Pcs        |
| 1. Atta 5kg   | 1   | ₹ 260 | ₹ 260    | [X]         | Subtotal:     ₹ 610.00     |
| 2. Sugar 1kg  | 2   | ₹ 45  | ₹ 90     | [X]         | Discount:     ₹ 10.00      |
| 3. Milk 1L    | 4   | ₹ 65  | ₹ 260    | [X]         | Total Payable: ₹ 600.00    |
+------------------------------------------------------|----------------------------|
| [ F2 ] Search Product Input [ Scan Barcode Here... ] | Select Payment Mode:       |
| Quick Hotkeys: [F4] Customer Khata | [F8] Discount   | ( ) Cash  ( ) UPI  ( )Khata|
|                [F9] Pay & Print    | [Esc] Clear Cart| [ F9: PRINT RECEIPT BILL ] |
+------------------------------------------------------+----------------------------+
```

---

### 9. 📒 Customers & Khata Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Customer Directory & Udhar Credit Ledger | [+ New Customer]        |
|--------------+--------------------------------------------------------------------|
| Customer List| Customer Details: Ramesh Kumar (Ph: 9876543210)                    |
| - All        | Credit Limit: ₹ 5,000 | Current Outstanding Udhar: ₹ 1,850        |
| - Khata Dues +--------------------------------------------------------------------+
| - Top Buyers | Date       | Type   | Description           | Amount  | Balance    |
|              | 2026-08-01 | Debit  | Bill #1012 (Credit)   | ₹ 1,200 | ₹ 1,200    |
|              | 2026-08-04 | Debit  | Bill #1038 (Credit)   | ₹ 650   | ₹ 1,850    |
|              | [ Send WhatsApp Reminder ]   [ Record Payment Received ]          |
+--------------+--------------------------------------------------------------------+
```

---

### 10. 🚚 Suppliers Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Suppliers & Purchase Orders | [+ Add Supplier] [Stock Inward]      |
|--------------+--------------------------------------------------------------------|
| Supplier List| Supplier Name | Contact Person | Phone      | Outstanding Payables |
| - Active     | Amul Dairy    | Vikram Shah    | 9811223344 | ₹ 14,500             |
| - Payables   | Fortune Mills | Suresh Gupta   | 9822334455 | ₹ 28,000             |
+--------------+--------------------------------------------------------------------+
```

---

### 11. 📈 Reports Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Business Reports | Date Range: [ 2026-08-01 ] to [ 2026-08-05 ]    |
|--------------+--------------------------------------------------------------------|
| Tabs:        | [ Sales Report ]   [ Expense vs Profit ]   [ GSTR Tax Report ]     |
| - Sales      +--------------------------------------------------------------------+
| - Profit/Loss| Total Revenue: ₹ 1,24,000 | Total Expenses: ₹ 18,500                 |
| - Tax / GST  | Estimated Net Profit: ₹ 22,400 | GST Payable: ₹ 6,200               |
|              | [ Download Excel Report ]   [ Download PDF Summary ]              |
+--------------+--------------------------------------------------------------------+
```

---

### 12. ⚙️ Settings Screen Wireframe
```text
+-----------------------------------------------------------------------------------+
| [Sidebar]    | Store Settings & System Configuration                              |
|--------------+--------------------------------------------------------------------|
| Setting Navigation: | [ Store Profile Settings ]                                  |
| - Store Info        | Store Name: [ Rishabh Provision Store                      ]|
| - Tax & GST         | GSTIN:      [ 24AAAAA0000A1Z5                            ]|
| - Thermal Printer   | Address:    [ Main Road, Near Market, Anand, Gujarat       ]|
| - API Keys          | Thermal Receipt Footer: [ Thank you! Visit again.         ]|
| - User Roles        | [ Save Changes ]                                            |
+---------------------+-------------------------------------------------------------+
```
