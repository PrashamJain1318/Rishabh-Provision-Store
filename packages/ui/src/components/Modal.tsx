import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-soft-lg p-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
