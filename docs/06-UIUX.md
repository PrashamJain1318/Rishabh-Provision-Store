# 06. UI/UX Planning & Wireframe Layouts (Phase 0.6)

## 📐 Layout Wireframes Overview
This document outlines low-fidelity wireframe structures for the 12 core screens of **Rishabh Provision Store**. The focus is strictly on spatial grid layout, content hierarchy, and UX element placement.

---

### 1. 🏠 Landing Page Wireframe
```text
+-----------------------------------------------------------------------------------+
|  [Logo] Rishabh Store      [Features] [Pricing] [About]    [ Login ] [ Register ] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|    [ HERO HEADER: Modern Provision Store Management & Express POS Billing ]      |
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
| - Dashboard  | [ Stat Card 1 ]  | [ Stat Card 2 ]  | [ Stat Card 3 ]  | [ Stat 4 ] |
| - Products   | Today's Sales    | Total Bills      | Low Stock Count  | Khata Dues |
| - Inventory  | ₹ 24,500         | 142 Bills        | 8 Items          | ₹ 12,400   |
| - Orders     +--------------------------------------------------------------------+
| - POS        | [ Sales Analytics Chart (Weekly) ]      | [ Recent POS Bills ]     |
| - Customers  |                                         | Bill #1042 - ₹ 450 (Cash) |
| - Suppliers  |                                         | Bill #1041 - ₹ 890 (UPI)  |
| - Reports    +--------------------------------------------------------------------+
| - Settings   | [ Low Stock Alert Table ]               | [ Quick POS Action ]     |
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
