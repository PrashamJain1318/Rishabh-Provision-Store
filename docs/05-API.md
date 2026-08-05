# 05. API Documentation

## Auth Endpoints
- `POST /api/v1/auth/login` - Authenticate user & issue token.
- `POST /api/v1/auth/logout` - Invalidate session.
- `GET  /api/v1/auth/me` - Get current user profile.

## Product & Inventory Endpoints
- `GET    /api/v1/products` - List products with pagination & search.
- `POST   /api/v1/products` - Create new product.
- `GET    /api/v1/products/:id` - Fetch product details.
- `PUT    /api/v1/products/:id` - Update product information.
- `DELETE /api/v1/products/:id` - Soft delete product.
- `GET    /api/v1/products/barcode/:code` - Quick barcode scan lookup.

## POS Transactions Endpoints
- `POST   /api/v1/transactions` - Create new sales bill / transaction.
- `GET    /api/v1/transactions` - List past transactions.
- `GET    /api/v1/transactions/:id` - Get transaction invoice details.

## Customer Khata Endpoints
- `GET    /api/v1/customers` - List customers with balances.
- `POST   /api/v1/customers` - Register new customer.
- `GET    /api/v1/customers/:id/ledger` - Fetch customer credit ledger history.
- `POST   /api/v1/customers/:id/payments` - Record payment against customer credit.
