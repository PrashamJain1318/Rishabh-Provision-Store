# 04. Database Architecture & Network Access Security Policy

## 🌐 Network Access Control Policy

### 1. Development Mode Policy
- **CIDR Block**: `0.0.0.0/0` (Allow Access From Anywhere).
- **Purpose**: Enables seamless local dev server testing across developer workstations, automated test runners, and team environments.

### 2. Production Hardening Policy (Pre-Deployment Checklist)
> [!WARNING]
> Before deploying `apps/server` to production hosting (Vercel / Render / AWS EC2):
> 1. **Revoke `0.0.0.0/0`**: Remove wildcard IP access from MongoDB Atlas Network Access.
> 2. **Whitelist Static IP / CIDR**: Add exact IP addresses of production backend servers (e.g. AWS Elastic IP or Vercel static egress IPs).
> 3. **VPC Peering**: Configure AWS / GCP private VPC peering for encrypted database traffic.

---

## 🍃 MongoDB Atlas Configuration Parameters

```text
Database Name:     rishabh-provision-store
Cluster Type:      M0 Free Tier (Shared)
Cloud Provider:    AWS / GCP
Primary Region:    ap-south-1 (Mumbai, India)
Admin User:        rps_admin
Network Access:    0.0.0.0/0 (Development Mode)
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
