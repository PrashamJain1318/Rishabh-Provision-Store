import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Sidebar, SidebarItemData } from "@rishabh-store/ui";
import { ThemeToggle } from "../components/ThemeToggle";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  userRole?: string;
  onNavSelect?: (id: string) => void;
}

const allNavItems: SidebarItemData[] = [
  { id: "dashboard", label: "Dashboard", iconName: "dashboard", path: "/dashboard", roles: ["Owner", "Manager"] },
  { id: "pos", label: "POS Billing", iconName: "pos", path: "/pos", roles: ["Owner", "Manager", "Cashier"] },
  { id: "products", label: "Products", iconName: "products", path: "/dashboard/products", roles: ["Owner", "Manager", "Cashier", "Employee"] },
  { id: "brands", label: "Brands", iconName: "brands", path: "/dashboard/brands", roles: ["Owner", "Manager"] },
  { id: "units", label: "Units", iconName: "units", path: "/dashboard/units", roles: ["Owner", "Manager"] },
  { id: "categories", label: "Categories", iconName: "categories", path: "/dashboard/categories", roles: ["Owner", "Manager"] },
  { id: "inventory", label: "Inventory", iconName: "inventory", path: "/dashboard/inventory", roles: ["Owner", "Manager"] },
  { id: "orders", label: "Orders", iconName: "orders", path: "/dashboard/orders", roles: ["Owner", "Manager", "Cashier", "Delivery Partner"] },
  { id: "customers", label: "Customers & Khata", iconName: "customers", path: "/dashboard/customers", roles: ["Owner", "Manager", "Cashier"] },
  { id: "suppliers", label: "Suppliers", iconName: "suppliers", path: "/dashboard/suppliers", roles: ["Owner", "Manager"] },
  { id: "expenses", label: "Expenses", iconName: "expenses", path: "/dashboard/reports", roles: ["Owner", "Manager"] },
  { id: "employees", label: "Employees", iconName: "employees", path: "/dashboard/settings", roles: ["Owner"] },
  { id: "reports", label: "Reports", iconName: "reports", path: "/dashboard/reports", roles: ["Owner", "Manager"] },
  { id: "coupons", label: "Coupons", iconName: "coupons", path: "/dashboard/settings", roles: ["Owner", "Manager"] },
  { id: "ai-assistant", label: "AI Assistant", iconName: "ai-assistant", path: "/dashboard/ai-assistant", roles: ["Owner", "Manager", "Cashier"] },
  { id: "settings", label: "Settings", iconName: "settings", path: "/dashboard/settings", roles: ["Owner"] },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeNavId = "dashboard",
  userRole = "Owner",
  onNavSelect,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarItems = allNavItems.map((item) => ({
    ...item,
    active: item.id === activeNavId,
  }));

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* 1. Sticky Top Navbar (Height 72px) */}
      <header className="h-[72px] shrink-0 sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between shadow-soft-sm">
        <div className="flex-1">
          <Navbar
            storeName="Rishabh Provision Store"
            userName="Prasham Jain"
            userRole={userRole}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            rightAction={<ThemeToggle />}
          />
        </div>
      </header>

      {/* Main Body Workspace (Height 100vh - 72px) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Slide-Over Navigation Drawer (<640px) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex md:hidden"
            >
              <div
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="relative w-[280px] max-w-[85vw] bg-slate-900 h-full flex flex-col justify-between shadow-soft-lg z-10 border-r border-slate-800 overflow-y-auto"
              >
                <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Store Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-xl text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Sidebar items={sidebarItems} userRole={userRole} onSelect={onNavSelect} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Desktop Collapsible Sidebar (Width 280px / 80px collapsed) */}
        <motion.aside
          animate={{ width: isSidebarCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0 hidden md:flex flex-col border-r border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-soft-sm relative"
        >
          <div className="p-3 flex justify-end bg-slate-950/60 border-b border-slate-800">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center transition-all shadow-soft-sm"
              title={isSidebarCollapsed ? "Expand Sidebar (280px)" : "Collapse Sidebar (80px)"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-emerald-400" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Sidebar
              items={sidebarItems}
              userRole={userRole}
              isCollapsed={isSidebarCollapsed}
              onSelect={onNavSelect}
            />
          </div>
        </motion.aside>

        {/* 3. Main Content Region */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex-1 max-w-7xl w-full mx-auto">{children}</div>

          {/* 4. Page Footer */}
          <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 pb-2 text-center text-xs text-slate-500">
            © 2026 Rishabh Provision Store. Smart Grocery. Smarter Business.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
