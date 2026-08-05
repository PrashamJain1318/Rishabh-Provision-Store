import React, { useState } from "react";
import { Navbar, Sidebar, SidebarItem } from "@rishabh-store/ui";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  onNavSelect?: (id: string) => void;
}

const defaultNavItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "pos", label: "POS Billing", icon: "⚡" },
  { id: "products", label: "Products", icon: "📦" },
  { id: "inventory", label: "Inventory", icon: "🏬" },
  { id: "orders", label: "Orders", icon: "🛒" },
  { id: "customers", label: "Customers & Khata", icon: "📒" },
  { id: "suppliers", label: "Suppliers", icon: "🚚" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeNavId = "dashboard",
  onNavSelect,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarItems = defaultNavItems.map((item) => ({
    ...item,
    active: item.id === activeNavId,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Sticky Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar storeName="Rishabh Provision Store" userName="Prasham Jain" userRole="Owner" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Collapsible Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : "w-64"
          } shrink-0 hidden md:block border-r border-slate-200 dark:border-slate-800 bg-slate-900`}
        >
          <div className="p-2 flex justify-end">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              title="Toggle Sidebar"
            >
              {isSidebarCollapsed ? "▶" : "◀"}
            </button>
          </div>
          {!isSidebarCollapsed ? (
            <Sidebar items={sidebarItems} onSelect={onNavSelect} />
          ) : (
            <div className="flex flex-col items-center gap-3 py-4">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavSelect?.(item.id)}
                  title={item.label}
                  className={`p-2.5 rounded-xl text-lg ${
                    item.active ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Main Content Region */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex-1">{children}</div>

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
