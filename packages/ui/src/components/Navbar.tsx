import React from "react";

export interface NavbarProps {
  storeName?: string;
  userName?: string;
  userRole?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ storeName = "Rishabh Provision Store", userName = "Store Admin", userRole = "Owner" }) => {
  return (
    <header className="h-16 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-900 dark:text-slate-100">{storeName}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{userName}</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{userRole}</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
          {userName.charAt(0)}
        </div>
      </div>
    </header>
  );
};
