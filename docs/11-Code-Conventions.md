# 11. Code Conventions & Coding Standards

## 📏 Naming Conventions Matrix

| Element Type | Convention | Example |
| :--- | :--- | :--- |
| **React Components & Layouts** | `PascalCase.tsx` | `ProductCard.tsx`, `DashboardLayout.tsx` |
| **Service Files** | `feature.service.ts` | `product.service.ts` |
| **Controller Files** | `feature.controller.ts` | `order.controller.ts` |
| **Route Files** | `feature.routes.ts` | `inventory.routes.ts` |
| **Repository Files** | `feature.repository.ts` | `customer.repository.ts` |
| **Variables & Functions** | `camelCase` | `productPrice`, `totalQuantity`, `calculateTotalBill()` |
| **React Component Names** | `PascalCase` | `ProductCard`, `OrderSummaryTable` |
| **Constants** | `UPPER_CASE` | `MAX_REORDER_LIMIT`, `DEFAULT_TAX_RATE` |
| **TypeScript Interfaces** | `PascalCase` | `interface Product`, `interface Customer` |
| **TypeScript Types** | `PascalCase` | `type OrderStatus`, `type PaymentMode` |

---

## 💻 Code Structure Rules

1. **No Any Types**: Always use explicit TypeScript types or interfaces.
2. **Layer Separation**: Controllers must delegate business logic to Services, and Services must delegate DB calls to Repositories.
3. **Encapsulated Features**: Frontend components specific to a single domain must live inside `apps/web/src/features/[feature_name]/`.
