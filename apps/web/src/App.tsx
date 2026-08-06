import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import InventoryDashboardPage from "./pages/InventoryDashboard";
import ProductsPage from "./pages/Products";
import BrandsPage from "./pages/Brands";
import UnitsPage from "./pages/Units";
import CategoriesPage from "./pages/Categories";
import InventoryPage from "./pages/Inventory";
import InventoryIntelligencePage from "./pages/InventoryIntelligence";
import PurchasesPage from "./pages/Purchases";
import OrdersPage from "./pages/Orders";
import POSPage from "./pages/POS";
import CustomersPage from "./pages/Customers";
import CustomerPortalPage from "./pages/CustomerPortal";
import CustomerIntelligencePage from "./pages/CustomerIntelligence";
import SuppliersPage from "./pages/Suppliers";
import ReportsPage from "./pages/Reports";
import FinancialDashboardPage from "./pages/FinancialDashboard";
import ExportCenterPage from "./pages/ExportCenter";
import SettingsPage from "./pages/Settings";
import ProfilePage from "./pages/Profile";
import AIAssistantPage from "./pages/AIAssistant";
import AIForecastingPage from "./pages/AIForecasting";
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
          <Route path="/dashboard" element={<InventoryDashboardPage />} />
          <Route path="/dashboard/inventory-dashboard" element={<InventoryDashboardPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/brands" element={<BrandsPage />} />
          <Route path="/dashboard/units" element={<UnitsPage />} />
          <Route path="/dashboard/categories" element={<CategoriesPage />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          <Route path="/dashboard/customer-portal" element={<CustomerPortalPage />} />
          <Route path="/dashboard/customer-intelligence" element={<CustomerIntelligencePage />} />
          <Route path="/dashboard/inventory" element={<InventoryPage />} />
          <Route path="/dashboard/inventory-intelligence" element={<InventoryIntelligencePage />} />
          <Route path="/dashboard/purchases" element={<PurchasesPage />} />
          <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
          <Route path="/dashboard/financial-analytics" element={<FinancialDashboardPage />} />
          <Route path="/dashboard/export-center" element={<ExportCenterPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/dashboard/ai-forecasting" element={<AIForecastingPage />} />

          {/* Alias Redirects */}
          <Route path="/products" element={<Navigate to="/dashboard/products" replace />} />
          <Route path="/brands" element={<Navigate to="/dashboard/brands" replace />} />
          <Route path="/units" element={<Navigate to="/dashboard/units" replace />} />
          <Route path="/categories" element={<Navigate to="/dashboard/categories" replace />} />
          <Route path="/orders" element={<Navigate to="/dashboard/orders" replace />} />
          <Route path="/customers" element={<Navigate to="/dashboard/customers" replace />} />
          <Route path="/customer-portal" element={<Navigate to="/dashboard/customer-portal" replace />} />
          <Route path="/customer-intelligence" element={<Navigate to="/dashboard/customer-intelligence" replace />} />
          <Route path="/inventory-intelligence" element={<Navigate to="/dashboard/inventory-intelligence" replace />} />
          <Route path="/financial-analytics" element={<Navigate to="/dashboard/financial-analytics" replace />} />
          <Route path="/export-center" element={<Navigate to="/dashboard/export-center" replace />} />
          <Route path="/ai-forecasting" element={<Navigate to="/dashboard/ai-forecasting" replace />} />
          <Route path="/inventory" element={<Navigate to="/dashboard/inventory" replace />} />
          <Route path="/purchases" element={<Navigate to="/dashboard/purchases" replace />} />
          <Route path="/suppliers" element={<Navigate to="/dashboard/suppliers" replace />} />
          <Route path="/reports" element={<Navigate to="/dashboard/reports" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
          <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="/ai-assistant" element={<Navigate to="/dashboard/ai-assistant" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
