# 🗄️ Rishabh Provision Store - Database Schema & Architecture

## MongoDB Collections Overview

1. `customers`: Customer profiles, wallet balance, loyalty tier & points
2. `addresses`: Customer delivery addresses (Home, Office, Other)
3. `carts`: Persistent shopping carts with guest-to-user merging logic
4. `orders`: Omnichannel orders with 9 lifecycle status states
5. `orderItems`: Snapshot items attached to orders
6. `wishlists`: Customer product wishlists & shareable token links
7. `coupons`: Promotional discount coupons (Percentage, Flat, BOGO)
8. `loyaltyTransactions`: Points earning & redemption ledger
9. `notifications`: In-app merchant & customer notification logs
10. `deliveryPartners`: Delivery drivers, vehicle registration & assigned orders
11. `inventory`: Stock levels, batches, reorder thresholds & aging brackets

---

## Indexing Strategy
- `customers.phone`: Unique Index
- `customers.customerCode`: Unique Index
- `orders.orderNumber`: Unique Index
- `orders.customer`: Index (Query by Customer)
- `inventory.sku`: Unique Index
