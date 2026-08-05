import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Sidebar, SidebarItem } from "@rishabh-store/ui";
import { ThemeToggle } from "../components/ThemeToggle";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  userRole?: string;
  onNavSelect?: (id: string) => void;
}

const allNavItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard", roles: ["Owner", "Manager"] },
  { id: "pos", label: "POS Billing", icon: "⚡", path: "/pos", roles: ["Owner", "Manager", "Cashier"] },
  { id: "products", label: "Products", icon: "📦", path: "/dashboard/products", roles: ["Owner", "Manager", "Cashier", "Employee"] },
  { id: "categories", label: "Categories", icon: "🏷️", path: "/dashboard/products", roles: ["Owner", "Manager"] },
  { id: "inventory", label: "Inventory", icon: "🏬", path: "/dashboard/inventory", roles: ["Owner", "Manager"] },
  { id: "orders", label: "Orders", icon: "🛒", path: "/dashboard/orders", roles: ["Owner", "Manager", "Cashier", "Delivery Partner"] },
  { id: "customers", label: "Customers & Khata", icon: "📒", path: "/dashboard/customers", roles: ["Owner", "Manager", "Cashier"] },
  { id: "suppliers", label: "Suppliers", icon: "🚚", path: "/dashboard/suppliers", roles: ["Owner", "Manager"] },
  { id: "expenses", label: "Expenses", icon: "💸", path: "/dashboard/reports", roles: ["Owner", "Manager"] },
  { id: "employees", label: "Employees", icon: "👥", path: "/dashboard/settings", roles: ["Owner"] },
  { id: "reports", label: "Reports", icon: "📈", path: "/dashboard/reports", roles: ["Owner", "Manager"] },
  { id: "coupons", label: "Coupons", icon: "🎟️", path: "/dashboard/settings", roles: ["Owner", "Manager"] },
  { id: "ai-assistant", label: "AI Assistant", icon: "🤖", path: "/dashboard/ai-assistant", roles: ["Owner", "Manager", "Cashier"] },
  { id: "settings", label: "Settings", icon: "⚙️", path: "/dashboard/settings", roles: ["Owner"] },
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
                className="relative w-[280px] max-w-[85vw] bg-slate-900 h-full p-4 flex flex-col justify-between shadow-soft-lg z-10 border-r border-slate-800 overflow-y-auto"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-bold text-white text-base">Store Navigation</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <Sidebar items={sidebarItems} userRole={userRole} onSelect={onNavSelect} />
                </div>
                <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 text-center font-mono">
                  Rishabh Retail OS v1.0
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Desktop Collapsible Sidebar (Width 280px / 80px collapsed) */}
        <motion.aside
          animate={{ width: isSidebarCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="shrink-0 hidden md:flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-y-auto shadow-soft-sm"
        >
          <div>
            <div className="p-3 flex justify-end">
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

            {!isSidebarCollapsed ? (
              <Sidebar items={sidebarItems} userRole={userRole} onSelect={onNavSelect} />
            ) : (
              <div className="flex flex-col items-center gap-2.5 py-4">
                {sidebarItems
                  .filter((item) => !item.roles || item.roles.includes(userRole))
                  .map((item) => (
                    <a
                      key={item.id}
                      href={item.path}
                      title={item.label}
                      className={`p-3 rounded-2xl text-xl transition-all ${
                        item.active
                          ? "bg-emerald-600 text-white shadow-soft-sm"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      {item.icon}
                    </a>
                  ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
            {!isSidebarCollapsed && "Rishabh OS • 280px Sidebar"}
          </div>
        </motion.aside>

        {/* 3. Main Content Region (Responsive 100% Height Scrollable Container) */}
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
