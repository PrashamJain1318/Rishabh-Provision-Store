import React from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  const typeStyles = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-orange-500 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-soft-lg flex items-center gap-3 text-sm font-medium ${typeStyles[type]}`}>
      <span>{message}</span>
      {onClose && <button onClick={onClose} className="opacity-70 hover:opacity-100">✕</button>}
    </div>
  );
};
