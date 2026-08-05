# 04. Database Architecture & MongoDB Atlas Setup Guide

## 🍃 MongoDB Atlas Setup Instructions (Free M0 Cluster)

Follow these steps to create your free MongoDB Atlas database cluster:

### Step 1: Create MongoDB Atlas Account
1. Visit [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register).
2. Sign up or log in with your Google account.

### Step 2: Create a Free Shared Cluster (M0)
1. Select **Deploy a Database** ➔ Choose **M0 Free Tier**.
2. **Provider**: AWS or GCP.
3. **Region**: `ap-south-1` (Mumbai, India) — recommended for lowest latency in South Asia.
4. **Cluster Name**: `RishabhStoreCluster`.

### Step 3: Configure Database User & Access Control
1. **Database Access**: Create a database user (e.g. Username: `rishabh_admin`, Password: `<your_secure_password>`).
2. **Network Access**: Add IP Address ➔ Select **Allow Access from Anywhere** (`0.0.0.0/0`) for local development.

### Step 4: Copy Connection URI
1. Click **Connect** on your cluster card.
2. Choose **Drivers** (Node.js).
3. Copy the Connection String:
   ```text
   mongodb+srv://rishabh_admin:<password>@rishabhstorecluster.mongodb.net/rishabh_provision_store?retryWrites=true&w=majority
   ```

### Step 5: Update Environment Variables
Paste your connection URI into `.env` and `apps/server/.env`:
```env
MONGODB_URI=mongodb+srv://rishabh_admin:<password>@rishabhstorecluster.mongodb.net/rishabh_provision_store?retryWrites=true&w=majority
```

---

## 📚 15 MongoDB Schema Collections Map

1. `users` — Store staff & registered customers (`Owner`, `Manager`, `Cashier`, `Employee`, `Delivery Partner`, `Customer`).
2. `products` — Grocery items, 12-digit barcode SKUs, selling prices, MRPs, stock quantities.
3. `categories` — Product categories (`Atta & Flours`, `Edible Oils`, `Dairy`, etc.).
4. `orders` — Omnichannel orders, line items, channels (`POS Bill`, `Online App`, `WhatsApp Delivery`).
5. `customers` — Customer profiles, phone numbers, digital Khata credit limits, due balances.
6. `suppliers` — Wholesale vendor profiles & purchase order tracking.
7. `employees` — Staff payroll & attendance records.
8. `attendances` — Daily clock-in / clock-out shifts.
9. `payments` — Transaction logs (`Cash`, `UPI / QR`, `Khata Udhar Credit`).
10. `expenses` — Store utility & operational expenses.
11. `notifications` — Low stock & perishable expiry alert feeds.
12. `reviews` — Product ratings & customer feedback.
13. `coupons` — Promo codes & discount parameters.
14. `deliveries` — Live order delivery dispatches & driver assignments.
15. `settings` — Store branding, GSTIN registration & thermal printer configurations.
