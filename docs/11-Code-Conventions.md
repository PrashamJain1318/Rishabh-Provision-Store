# 11. Code Conventions & State Architecture

## 🧠 State Management Architecture Strategy

To maintain maximum rendering performance and eliminate state synchronization bugs, state is strictly separated into 3 dedicated layers:

| State Layer | Responsibility | Technology | Examples |
| :--- | :--- | :--- | :--- |
| **UI State** | Client-only visual & navigation state | **Zustand** | Sidebar collapse toggle, theme mode (`light`/`dark`), active modal ID, active drawer visibility. |
| **Server State** | Asynchronous API data & caching | **TanStack Query** | Product catalog, order streams, customer credit ledgers, inventory stock counts, re-fetching & caching. |
| **Form State** | Interactive user form inputs & validations | **React Hook Form (+ Zod)** | Product creation modal, customer registration form, POS payment form, store settings inputs. |

---

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
