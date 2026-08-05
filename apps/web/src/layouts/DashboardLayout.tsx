import React, { useState } from "react";
import { Navbar, Sidebar, SidebarItem } from "@rishabh-store/ui";
import { ThemeToggle } from "../components/ThemeToggle";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  userRole?: string;
  onNavSelect?: (id: string) => void;
}

const allNavItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard", roles: ["Owner", "Manager"] },
  { id: "pos", label: "POS Billing", icon: "⚡", path: "/pos", roles: ["Owner", "Manager", "Cashier"] },
  { id: "products", label: "Products", icon: "📦", path: "/products", roles: ["Owner", "Manager", "Cashier", "Employee"] },
  { id: "categories", label: "Categories", icon: "🏷️", path: "/products", roles: ["Owner", "Manager"] },
  { id: "inventory", label: "Inventory", icon: "🏬", path: "/inventory", roles: ["Owner", "Manager"] },
  { id: "orders", label: "Orders", icon: "🛒", path: "/orders", roles: ["Owner", "Manager", "Cashier", "Delivery Partner"] },
  { id: "customers", label: "Customers & Khata", icon: "📒", path: "/customers", roles: ["Owner", "Manager", "Cashier"] },
  { id: "suppliers", label: "Suppliers", icon: "🚚", path: "/suppliers", roles: ["Owner", "Manager"] },
  { id: "expenses", label: "Expenses", icon: "💸", path: "/reports", roles: ["Owner", "Manager"] },
  { id: "employees", label: "Employees", icon: "👥", path: "/settings", roles: ["Owner"] },
  { id: "reports", label: "Reports", icon: "📈", path: "/reports", roles: ["Owner", "Manager"] },
  { id: "coupons", label: "Coupons", icon: "🎟️", path: "/settings", roles: ["Owner", "Manager"] },
  { id: "ai-assistant", label: "AI Assistant", icon: "🤖", path: "/dashboard", roles: ["Owner", "Manager", "Cashier"] },
  { id: "settings", label: "Settings", icon: "⚙️", path: "/settings", roles: ["Owner"] },
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sticky Navbar with Mobile Menu Drawer Trigger */}
      <div className="sticky top-0 z-40">
        <Navbar
          storeName="Rishabh Provision Store"
          userName="Prasham Jain"
          userRole={userRole}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          rightAction={<ThemeToggle />}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Slide-Over Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-slate-900 h-full p-4 flex flex-col justify-between shadow-soft-lg z-10 border-r border-slate-800 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-white text-base">Store Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-white text-sm"
                  >
                    ✕
                  </button>
                </div>
                <Sidebar items={sidebarItems} userRole={userRole} onSelect={onNavSelect} />
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                Rishabh Provision Store App v1.0
              </div>
            </div>
          </div>
        )}

        {/* Desktop Collapsible Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : "w-64"
          } shrink-0 hidden md:block border-r border-slate-200 dark:border-slate-800 bg-slate-900 overflow-y-auto`}
        >
          <div className="p-3 flex justify-end">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
              title="Toggle Sidebar"
            >
              <span>{isSidebarCollapsed ? "▶" : "◀ Collapse"}</span>
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
                    className={`p-2.5 rounded-2xl text-lg transition-all ${
                      item.active ? "bg-emerald-600 text-white shadow-soft-sm" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    {item.icon}
                  </a>
                ))}
            </div>
          )}
        </div>

        {/* Main Content Region */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex-1">{children}</div>

          <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 pb-2 text-center text-xs text-slate-500">
            © 2026 Rishabh Provision Store. Smart Grocery. Smarter Business.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
