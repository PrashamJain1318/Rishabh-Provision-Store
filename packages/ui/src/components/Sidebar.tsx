import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  Package,
  Layers,
  Warehouse,
  ShoppingCart,
  BookUser,
  Truck,
  Receipt,
  Users,
  BarChart3,
  Ticket,
  Bot,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export interface SidebarItemData {
  id: string;
  label: string;
  iconName: string;
  path: string;
  roles?: string[];
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItemData[];
  userRole?: string;
  isCollapsed?: boolean;
  onSelect?: (id: string) => void;
  onLogout?: () => void;
  className?: string;
}

const getLucideIcon = (iconName: string) => {
  switch (iconName) {
    case "dashboard": return <LayoutDashboard className="w-5 h-5" />;
    case "pos": return <Zap className="w-5 h-5 text-amber-400" />;
    case "products": return <Package className="w-5 h-5" />;
    case "categories": return <Layers className="w-5 h-5" />;
    case "inventory": return <Warehouse className="w-5 h-5" />;
    case "orders": return <ShoppingCart className="w-5 h-5" />;
    case "customers": return <BookUser className="w-5 h-5" />;
    case "suppliers": return <Truck className="w-5 h-5" />;
    case "expenses": return <Receipt className="w-5 h-5" />;
    case "employees": return <Users className="w-5 h-5" />;
    case "reports": return <BarChart3 className="w-5 h-5" />;
    case "coupons": return <Ticket className="w-5 h-5" />;
    case "ai-assistant": return <Bot className="w-5 h-5 text-emerald-400" />;
    case "settings": return <Settings className="w-5 h-5" />;
    default: return <LayoutDashboard className="w-5 h-5" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  userRole = "Owner",
  isCollapsed = false,
  onSelect,
  onLogout,
  className = "",
}) => {
  const visibleItems = items.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className={`h-full flex flex-col justify-between p-3 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-slate-100 backdrop-blur-xl border-r border-slate-800 ${className}`}>
      {/* Navigation Items List */}
      <div className="space-y-1 overflow-y-auto pr-1">
        {visibleItems.map((item) => (
          <motion.a
            key={item.id}
            href={item.path}
            onClick={() => onSelect?.(item.id)}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
              item.active
                ? "bg-emerald-600 text-white shadow-soft-sm ring-1 ring-emerald-400/40"
                : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
            }`}
          >
            <span className={item.active ? "text-white" : "text-slate-400"}>
              {getLucideIcon(item.iconName)}
            </span>
            {!isCollapsed && <span className="line-clamp-1">{item.label}</span>}
          </motion.a>
        ))}
      </div>

      {/* Bottom Help Center & Logout Actions */}
      <div className="pt-3 border-t border-slate-800/80 space-y-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => alert("Redirecting to Help Center & Documentation...")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 transition-all"
        >
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          {!isCollapsed && <span>Help Center</span>}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={onLogout || (() => window.location.href = "/login")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-all"
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Sign Out</span>}
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
