import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-soft-sm">
      <button
        onClick={() => setTheme("light")}
        title="Light Mode"
        className={`p-1.5 rounded-xl transition-all ${
          theme === "light"
            ? "bg-white dark:bg-slate-900 text-amber-500 shadow-soft-sm font-semibold"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        title="Dark Mode"
        className={`p-1.5 rounded-xl transition-all ${
          theme === "dark"
            ? "bg-white dark:bg-slate-900 text-emerald-400 shadow-soft-sm font-semibold"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        title="System Default"
        className={`p-1.5 rounded-xl transition-all ${
          theme === "system"
            ? "bg-white dark:bg-slate-900 text-blue-500 shadow-soft-sm font-semibold"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeToggle;
