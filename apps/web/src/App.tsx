import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import ProductsPage from "./pages/Products";
import InventoryPage from "./pages/Inventory";
import OrdersPage from "./pages/Orders";
import POSPage from "./pages/POS";
import CustomersPage from "./pages/Customers";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Storefront & Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Express POS Terminal Route */}
          <Route path="/pos" element={<POSPage />} />

          {/* Dashboard Sub-routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          <Route path="/dashboard/inventory" element={<InventoryPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />

          {/* Alias Redirects */}
          <Route path="/products" element={<Navigate to="/dashboard/products" replace />} />
          <Route path="/orders" element={<Navigate to="/dashboard/orders" replace />} />
          <Route path="/customers" element={<Navigate to="/dashboard/customers" replace />} />
          <Route path="/inventory" element={<Navigate to="/dashboard/inventory" replace />} />
          <Route path="/reports" element={<Navigate to="/dashboard/reports" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
