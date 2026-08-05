import React from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  onSelect?: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, onSelect }) => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-slate-100 p-4 flex flex-col border-r border-slate-800">
      <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-4">
        <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white">R</div>
        <span className="font-bold text-lg text-white">Rishabh Store</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect?.(item.id)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
              item.active ? "bg-emerald-600 text-white font-semibold" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
