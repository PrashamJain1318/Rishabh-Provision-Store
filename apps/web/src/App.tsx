import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import "./index.css";

// Route-based Lazy Loading Code Splitting
const POSPage = lazy(() => import("./pages/POS"));
const InventoryDashboardPage = lazy(() => import("./pages/InventoryDashboard"));
const ProductsPage = lazy(() => import("./pages/Products"));
const BrandsPage = lazy(() => import("./pages/Brands"));
const UnitsPage = lazy(() => import("./pages/Units"));
const CategoriesPage = lazy(() => import("./pages/Categories"));
const InventoryPage = lazy(() => import("./pages/Inventory"));
const InventoryIntelligencePage = lazy(() => import("./pages/InventoryIntelligence"));
const PurchasesPage = lazy(() => import("./pages/Purchases"));
const OrdersPage = lazy(() => import("./pages/Orders"));
const CustomersPage = lazy(() => import("./pages/Customers"));
const CustomerPortalPage = lazy(() => import("./pages/CustomerPortal"));
const CustomerIntelligencePage = lazy(() => import("./pages/CustomerIntelligence"));
const SuppliersPage = lazy(() => import("./pages/Suppliers"));
const ReportsPage = lazy(() => import("./pages/Reports"));
const FinancialDashboardPage = lazy(() => import("./pages/FinancialDashboard"));
const ExportCenterPage = lazy(() => import("./pages/ExportCenter"));
const BackupRestorePage = lazy(() => import("./pages/BackupRestore"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const AIAssistantPage = lazy(() => import("./pages/AIAssistant"));
const AIForecastingPage = lazy(() => import("./pages/AIForecasting"));
const SystemMonitoringPage = lazy(() => import("./pages/SystemMonitoring"));
const LoadTestingDashboardPage = lazy(() => import("./pages/LoadTestingDashboard"));
const GSTDashboardPage = lazy(() => import("./pages/GSTDashboard"));
const GSTSettingsPage = lazy(() => import("./pages/GSTSettings"));
const GSTReportsPage = lazy(() => import("./pages/GSTReports"));
const TaxSummaryPage = lazy(() => import("./pages/TaxSummary"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium">Loading Rishabh Store OS...</span>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Storefront & Auth Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Express POS Terminal & Monitoring Routes */}
            <Route path="/pos" element={<POSPage />} />
            <Route path="/monitoring" element={<SystemMonitoringPage />} />
            <Route path="/load-testing" element={<LoadTestingDashboardPage />} />

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
            <Route path="/dashboard/backup-restore" element={<BackupRestorePage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/dashboard/ai-forecasting" element={<AIForecastingPage />} />
            <Route path="/dashboard/monitoring" element={<SystemMonitoringPage />} />
            <Route path="/dashboard/load-testing" element={<LoadTestingDashboardPage />} />
            <Route path="/dashboard/gst-dashboard" element={<GSTDashboardPage />} />
            <Route path="/dashboard/gst-settings" element={<GSTSettingsPage />} />
            <Route path="/dashboard/gst-reports" element={<GSTReportsPage />} />
            <Route path="/dashboard/tax-summary" element={<TaxSummaryPage />} />

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
            <Route path="/backup-restore" element={<Navigate to="/dashboard/backup-restore" replace />} />
            <Route path="/ai-forecasting" element={<Navigate to="/dashboard/ai-forecasting" replace />} />
            <Route path="/inventory" element={<Navigate to="/dashboard/inventory" replace />} />
            <Route path="/purchases" element={<Navigate to="/dashboard/purchases" replace />} />
            <Route path="/suppliers" element={<Navigate to="/dashboard/suppliers" replace />} />
            <Route path="/reports" element={<Navigate to="/dashboard/reports" replace />} />
            <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
            <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
            <Route path="/ai-assistant" element={<Navigate to="/dashboard/ai-assistant" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
