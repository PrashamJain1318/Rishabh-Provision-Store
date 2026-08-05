import React from "react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isAiDrawer?: boolean;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, isAiDrawer = false, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className={`w-full max-w-md h-full p-6 border-l border-slate-200 dark:border-slate-800 shadow-soft-lg flex flex-col justify-between ${
        isAiDrawer ? "glass-panel text-slate-900 dark:text-slate-100" : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
      }`}>
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {isAiDrawer && <span>🤖</span>} {title}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
