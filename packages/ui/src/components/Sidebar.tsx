import React from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles?: string[]; // Allowed roles (e.g. ['Owner', 'Manager', 'Cashier'])
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  userRole?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  userRole = "Owner",
  onSelect,
  className = "",
}) => {
  // Filter items by user role if roles array is defined
  const visibleItems = items.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <aside className={`w-full py-4 flex flex-col gap-1 ${className}`}>
      {visibleItems.map((item) => (
        <a
          key={item.id}
          href={item.path}
          onClick={() => onSelect?.(item.id)}
          className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-2xl text-sm font-semibold transition-all duration-200 ${
            item.active
              ? "bg-emerald-600 text-white shadow-soft-sm"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </aside>
  );
};

export default Sidebar;
